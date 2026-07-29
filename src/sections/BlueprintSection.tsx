import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

// Procedural garment wireframe (abstract jacket)
function createGarmentGeometry(): THREE.BufferGeometry {
  const vertices: number[] = [];
  const edges: number[] = [];

  // Jacket outline - front panel
  const panel = [
    [-1.2, 2.0, 0.3], [1.2, 2.0, 0.3],    // shoulders
    [1.4, 1.5, 0.35], [-1.4, 1.5, 0.35],   // upper chest
    [1.3, 0.5, 0.4], [-1.3, 0.5, 0.4],     // waist
    [1.2, -0.5, 0.35], [-1.2, -0.5, 0.35], // hips
    [1.0, -1.8, 0.3], [-1.0, -1.8, 0.3],   // hem
  ];

  // Back panel (slightly offset)
  const backPanel = panel.map((v) => [v[0], v[1], -v[2]]);

  // Add vertices
  let idx = 0;
  const addVert = (v: number[]) => {
    vertices.push(v[0], v[1], v[2]);
    return idx++;
  };

  const frontIdx = panel.map(addVert);
  const backIdx = backPanel.map(addVert);

  // Connect front panel edges
  for (let i = 0; i < frontIdx.length; i += 2) {
    edges.push(frontIdx[i], frontIdx[i + 1]);        // horizontal
    if (i + 2 < frontIdx.length) {
      edges.push(frontIdx[i], frontIdx[(i + 2) % frontIdx.length]); // vertical left
      edges.push(frontIdx[i + 1], frontIdx[(i + 3) % frontIdx.length]); // vertical right
    }
  }

  // Connect back panel edges
  for (let i = 0; i < backIdx.length; i += 2) {
    edges.push(backIdx[i], backIdx[i + 1]);
    if (i + 2 < backIdx.length) {
      edges.push(backIdx[i], backIdx[(i + 2) % backIdx.length]);
      edges.push(backIdx[i + 1], backIdx[(i + 3) % backIdx.length]);
    }
  }

  // Connect front to back (side seams)
  for (let i = 0; i < frontIdx.length; i++) {
    edges.push(frontIdx[i], backIdx[i]);
  }

  // Collar / neckline
  const collar = [
    [-0.5, 2.0, 0.3], [0.5, 2.0, 0.3],
    [-0.3, 2.3, 0.25], [0.3, 2.3, 0.25],
    [-0.5, 2.0, -0.3], [0.5, 2.0, -0.3],
    [-0.3, 2.3, -0.25], [0.3, 2.3, -0.25],
  ];
  const collarIdx = collar.map(addVert);
  for (let i = 0; i < 4; i++) {
    edges.push(collarIdx[i], collarIdx[(i + 1) % 4]);
    edges.push(collarIdx[i + 4], collarIdx[((i + 1) % 4) + 4]);
    edges.push(collarIdx[i], collarIdx[i + 4]);
  }

  // Lapels
  const lapelLeft = [
    [-0.1, 2.0, 0.32], [-0.8, 1.5, 0.38],
    [-0.1, 1.6, 0.38], [-0.6, 1.2, 0.4],
  ];
  const lapelRight = [
    [0.1, 2.0, 0.32], [0.8, 1.5, 0.38],
    [0.1, 1.6, 0.38], [0.6, 1.2, 0.4],
  ];
  const lapelLIdx = lapelLeft.map(addVert);
  const lapelRIdx = lapelRight.map(addVert);
  for (let i = 0; i < 2; i++) {
    edges.push(lapelLIdx[i * 2], lapelLIdx[i * 2 + 1]);
    edges.push(lapelRIdx[i * 2], lapelRIdx[i * 2 + 1]);
  }

  // Darts (vertical lines from waist)
  const dartY = [0.5, 0.0, -0.5, -1.0];
  dartY.forEach((y) => {
    const d = vertices.length / 3;
    vertices.push(0, y, 0.42, 0, y - 0.3, 0.4);
    edges.push(d, d + 1);
  });

  // Sleeve outlines
  const sleeveLeft = [
    [-1.2, 2.0, 0.3], [-2.0, 1.8, 0.2],
    [-2.2, 1.0, 0.15], [-2.0, 0.0, 0.1],
    [-1.8, -0.5, 0.15],
  ];
  const sleeveRight = sleeveLeft.map((v) => [-v[0], v[1], v[2]]);
  const sleeveLIdx = sleeveLeft.map(addVert);
  const sleeveRIdx = sleeveRight.map(addVert);
  for (let i = 0; i < sleeveLIdx.length - 1; i++) {
    edges.push(sleeveLIdx[i], sleeveLIdx[i + 1]);
    edges.push(sleeveRIdx[i], sleeveRIdx[i + 1]);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setIndex(edges);
  return geo;
}

export default function BlueprintSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasElement.appendChild(renderer.domElement);

    // Main wireframe
    const geometry = createGarmentGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4D00FF,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(geometry, lineMaterial);
    scene.add(wireframe);

    // Nodes (vertex points)
    const positions = geometry.attributes.position.array;
    const nodePositions: number[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      nodePositions.push(positions[i], positions[i + 1], positions[i + 2]);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x4D00FF,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // Data particles
    const particleCount = 20;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleProgress = new Float32Array(particleCount);
    const particleSpeed = new Float32Array(particleCount);
    const particleEdgeStart = new Int32Array(particleCount);
    const particleEdgeEnd = new Int32Array(particleCount);

    const geometryIndex = geometry.index
    if (!geometryIndex) return
    const indexCount = geometryIndex.count
    const edgeArray = geometryIndex.array as Uint32Array

    for (let i = 0; i < particleCount; i++) {
      const edgeIdx = Math.floor(Math.random() * (indexCount / 2)) * 2
      particleEdgeStart[i] = edgeArray[edgeIdx]
      particleEdgeEnd[i] = edgeArray[edgeIdx + 1]
      particleProgress[i] = Math.random()
      particleSpeed[i] = 0.002 + Math.random() * 0.006
      particlePositions[i * 3] = 0
      particlePositions[i * 3 + 1] = 0
      particlePositions[i * 3 + 2] = 0
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8844FF,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation
    const clock = new THREE.Clock();
    let animId = 0;

    function animate() {
      const t = clock.getElapsedTime();
      const speed = hoveredSkill !== null ? 0.3 : 0.8;
      wireframe.rotation.y = t * 0.15 * speed;
      nodes.rotation.y = t * 0.15 * speed;
      particles.rotation.y = t * 0.15 * speed;

      // Pulse opacity
      lineMaterial.opacity = 0.4 + 0.3 * Math.sin(t * 2);

      // Update particles
      const posArr = particlePositions;
      const vertArr = positions;
      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] += particleSpeed[i];
        if (particleProgress[i] >= 1) {
          particleProgress[i] = 0
          const edgeIdx = Math.floor(Math.random() * (indexCount / 2)) * 2
          particleEdgeStart[i] = edgeArray[edgeIdx]
          particleEdgeEnd[i] = edgeArray[edgeIdx + 1]
        }
        const p = particleProgress[i];
        const sIdx = particleEdgeStart[i] * 3;
        const eIdx = particleEdgeEnd[i] * 3;
        posArr[i * 3] = vertArr[sIdx] + (vertArr[eIdx] - vertArr[sIdx]) * p;
        posArr[i * 3 + 1] = vertArr[sIdx + 1] + (vertArr[eIdx + 1] - vertArr[sIdx + 1]) * p;
        posArr[i * 3 + 2] = vertArr[sIdx + 2] + (vertArr[eIdx + 2] - vertArr[sIdx + 2]) * p;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleMat.opacity = 0.6 + 0.4 * Math.sin(t * 3);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvasElement.innerHTML = ''
    };
  }, [hoveredSkill]);

  // Skill bar animations
  useEffect(() => {
    if (!sectionRef.current) return;
    const bars = barsRef.current.filter(Boolean);
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        bars.forEach((bar, i) => {
          const fill = bar?.querySelector('.skill-fill') as HTMLElement;
          if (fill) {
            gsap.fromTo(
              fill,
              { width: '0%' },
              {
                width: `${skills[i].level}%`,
                duration: 1.2,
                delay: i * 0.1,
                ease: 'power2.out',
              }
            );
          }
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white section-padding">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Three.js Canvas */}
        <div
          ref={canvasRef}
          className="w-full h-[400px] lg:h-[600px] bg-fashion-void rounded relative"
        >
          {/* Floating Labels */}
          <span className="absolute top-[20%] left-[25%] font-mono text-[10px] text-fashion-indigo/70">
            SHOULDER_Scin_01
          </span>
          <span className="absolute top-[35%] right-[20%] font-mono text-[10px] text-fashion-indigo/70">
            LAPEL_Angle_45°
          </span>
          <span className="absolute bottom-[35%] left-[30%] font-mono text-[10px] text-fashion-indigo/70">
            DART_Waist_02
          </span>
          <span className="absolute bottom-[20%] right-[25%] font-mono text-[10px] text-fashion-indigo/70">
            SEAM_Side_01
          </span>
        </div>

        {/* Right - Skills */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            06 · CAPABILITIES
          </p>
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black mb-10">
            Technical<br />Expertise
          </h2>

          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                ref={(el) => { barsRef.current[i] = el; }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-lg font-medium text-fashion-black group-hover:text-fashion-indigo transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-fashion-indigo">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="skill-fill h-full bg-fashion-indigo rounded-full"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
