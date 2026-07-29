import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VERT = `
attribute float aSpeed;
attribute float aOffset;
attribute float aSize;
varying float vAlpha;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vec3 pos = position;
  float t = uTime * aSpeed + aOffset;
  
  // Vertical fall with wraparound
  pos.y = mod(pos.y - t * 0.5 + 6.0, 12.0) - 6.0;
  
  // Slight sine wave
  pos.x += sin(t * 0.3 + aOffset) * 0.1;
  pos.z += cos(t * 0.2 + aOffset) * 0.1;
  
  // Mouse repulsion
  vec2 toMouse = pos.xy - uMouse;
  float mouseDist = length(toMouse);
  float repel = smoothstep(2.0, 0.0, mouseDist) * 0.5;
  pos.xy += normalize(toMouse) * repel;
  
  vAlpha = aSize * 0.8 + 0.2;
  
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * 2.0 * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = `
varying float vAlpha;
uniform vec3 uColor;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
  gl_FragColor = vec4(uColor, alpha);
}
`;

export default function ThreadsSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasElement.clientWidth / canvasElement.clientHeight,
      0.1,
      50
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x4D00FF, 1);
    canvasElement.appendChild(renderer.domElement);

    // Particles
    const count = window.innerWidth < 768 ? 6000 : 12000;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.5 + Math.random() * 1.5;
      offsets[i] = Math.random() * 100;
      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(999, 999) },
        uColor: { value: new THREE.Color(0xFFFFFF) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse tracking
    const mouse = new THREE.Vector2(999, 999);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
    };
    canvasElement.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let animId = 0;
    function animate() {
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      material.uniforms.uMouse.value.lerp(mouse, 0.05);

      // Gentle camera parallax
      camera.position.x = Math.sin(t * 0.1) * 0.3;
      camera.position.y = Math.cos(t * 0.08) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    // Resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Text entrance
    if (textRef.current && sectionRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvasElement.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      canvasElement.innerHTML = '';
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: '#4D00FF' }}
      />

      {/* Vignette overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Text Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-[800px] opacity-0">
        <h2
          className="font-serif text-[48px] md:text-[96px] font-normal leading-[1.0] tracking-[-1px] text-white"
          style={{ mixBlendMode: 'exclusion' }}
        >
          THE DEVIL IS IN THE THREADS.
        </h2>
        <p className="font-sans text-lg md:text-xl text-white/80 mt-6">
          Every stitch is a decision. Every pattern, a program.
        </p>
      </div>
    </section>
  );
}
