import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform float u_warpSpeed;
uniform float u_fabricFreq;
uniform float u_foldDepth;
uniform float u_lightAngle;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    val += amp * noise(p);
    p *= 2.1;
    amp *= 0.5;
  }
  return val;
}

vec2 fabricWarp(vec2 uv, float t) {
  float f1x = 2.7, f1y = 3.1, spd1 = 0.4;
  float f2x = 1.9, f2y = 2.3, spd2 = 0.3;
  float f3x = 4.1, f3y = 3.7, spd3 = 0.55;
  float f4x = 2.3, f4y = 1.7, spd4 = 0.35;
  vec2 s1 = vec2(sin(uv.y * f1x + t * spd1), cos(uv.x * f1y + t * spd1)) * 0.03;
  vec2 s2 = vec2(cos(uv.y * f2x - t * spd2), sin(uv.x * f2y - t * spd2)) * 0.025;
  float combX = sin(uv.x * f3x + uv.y * f3y + t * spd3) * 0.02;
  float combY = cos(uv.y * f3y - uv.x * f3x - t * spd3) * 0.015;
  vec2 comb = vec2(combX, combY);
  vec2 uv3 = uv + vec2(0.7, -0.4);
  vec2 s3 = vec2(sin(uv3.y * f4x + t * spd4), cos(uv3.x * f4y + t * spd4)) * 0.02;
  return (s1 + s2 + comb + s3) * u_fabricFreq;
}

float fabricFolds(vec2 uv, float t) {
  float t1 = sin(uv.x * 3.0 + uv.y * 1.5 + t * 0.25) * 0.5 + 0.5;
  float t2 = sin(uv.x * 2.0 - uv.y * 2.5 + t * 0.18 + 1.0) * 0.5 + 0.5;
  float t3 = sin(uv.y * 4.0 + t * 0.12 + 2.5) * 0.5 + 0.5;
  float combined = t1 * 0.5 + t2 * 0.3 + t3 * 0.2;
  float noiseVal = fbm(uv * 2.0 + t * 0.05);
  return clamp((combined * 0.7 + noiseVal * 0.3) * u_foldDepth, 0.0, 1.0);
}

float fabricWeave(vec2 uv, float scale) {
  vec2 fUV = uv * scale * 400.0;
  float threadX = step(0.5, fract(fUV.x));
  float threadY = step(0.5, fract(fUV.y));
  return threadX * 0.15 + threadY * 0.15;
}

vec3 tartanPattern(vec2 uv) {
  float angle = 0.12;
  vec2 rotated = vec2(
    uv.x * cos(angle) - uv.y * sin(angle),
    uv.x * sin(angle) + uv.y * cos(angle)
  );
  float threadW = 1.0 / 24.0;
  float px = 1.2 / min(u_res.x, u_res.y);
  float b1 = mod(rotated.x, threadW * 4.0);
  float b2 = mod(rotated.y, threadW * 4.0);
  float inBand1x = smoothstep(threadW * 0.5 + px, threadW * 0.5 - px, abs(b1 - threadW))
    + smoothstep(threadW * 0.35 + px, threadW * 0.35 - px, abs(b1 - threadW * 3.0));
  float inBand1y = smoothstep(threadW * 0.5 + px, threadW * 0.5 - px, abs(b2 - threadW))
    + smoothstep(threadW * 0.35 + px, threadW * 0.35 - px, abs(b2 - threadW * 3.0));
  float inBand = clamp(inBand1x + inBand1y, 0.0, 1.0);
  float weave = fabricWeave(rotated, 1.0);
  vec3 colDark = vec3(0.035, 0.035, 0.04);
  vec3 colMed = vec3(0.12, 0.10, 0.15);
  vec3 colBright = vec3(0.5, 0.45, 0.3);
  vec3 colStripe = vec3(0.55, 0.0, 0.0);
  vec3 colGold = vec3(0.75, 0.55, 0.15);
  vec3 col = mix(colDark, colMed, weave);
  if (inBand1x > 0.5) col = mix(col, colStripe * 0.85, 0.5);
  if (inBand1y > 0.5) col = mix(col, colBright * 0.85, 0.5);
  if (inBand1x > 0.5 && inBand1y > 0.5) col = mix(col, colGold * 0.65, 0.5);
  col *= 0.7 + 0.3 * inBand;
  return col;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  uv.x = (uv.x - 0.5) * aspect + 0.5;
  float t = u_time * u_warpSpeed;
  vec2 warp = fabricWarp(uv, t);
  float fold = fabricFolds(uv, t);
  vec2 warpedUV = uv + warp * (0.5 + fold * 2.5);
  vec3 baseColor = tartanPattern(warpedUV);
  float highlight = 0.0;
  float sheen = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float fa = sin(warpedUV.x * 3.5 + warpedUV.y * 1.2 + fi * 1.7 + t * 0.2) * 0.5 + 0.5;
    float fb = sin(warpedUV.x * 5.0 - warpedUV.y * 2.0 + fi * 2.3 - t * 0.15) * 0.5 + 0.5;
    float f = fa * 0.6 + fb * 0.4;
    float fEdge = abs(f - 0.5) * 2.0;
    float fCenter = 1.0 - fEdge;
    float h = pow(fCenter, 8.0);
    float s = pow(fCenter, 20.0) * (sin(warpedUV.x * 30.0 + warpedUV.y * 20.0 + fi * 5.0) * 0.5 + 0.5);
    highlight += h * (0.5 + 0.5 * sin(fi * 1.5 + t * 0.3));
    sheen += s * (0.4 + 0.2 * sin(fi * 2.0 - t * 0.25));
  }
  float foldShadow = smoothstep(0.2, 0.5, fold) * smoothstep(0.8, 0.5, fold);
  float cosAngle = cos(u_lightAngle);
  float sinAngle = sin(u_lightAngle);
  float warpAngle = atan(warp.y, warp.x);
  float lightening = smoothstep(0.6, 1.0, sin(warpAngle - u_lightAngle) * 0.5 + 0.5) * length(warp) * 15.0;
  vec3 color = baseColor * (0.65 + 0.35 * (1.0 - fold)) * (1.0 - foldShadow * 0.35);
  vec3 highlightColor = vec3(0.9, 0.88, 0.82) * highlight * 0.35;
  vec3 sheenColor = vec3(0.95, 0.92, 0.85) * sheen * 0.5;
  color += highlightColor + sheenColor + vec3(0.05, 0.03, 0.06) * lightening;
  float vig = 1.0 - dot(v_uv - 0.5, v_uv - 0.5) * 1.5;
  color *= clamp(vig, 0.0, 1.0);
  float grain = hash(v_uv * u_res + fract(u_time * 0.1) * 100.0);
  color += (grain - 0.5) * 0.025;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function initFabricCanvas(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return null;

  function createShader(type: number, source: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, source);
    gl!.compileShader(s);
    return s;
  }

  const vs = createShader(gl.VERTEX_SHADER, VERT);
  const fs = createShader(gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uWarpSpeed = gl.getUniformLocation(prog, 'u_warpSpeed');
  const uFabricFreq = gl.getUniformLocation(prog, 'u_fabricFreq');
  const uFoldDepth = gl.getUniformLocation(prog, 'u_foldDepth');
  const uLightAngle = gl.getUniformLocation(prog, 'u_lightAngle');

  gl.uniform1f(uWarpSpeed, 1.0);
  gl.uniform1f(uFabricFreq, 1.0);
  gl.uniform1f(uFoldDepth, 1.0);
  gl.uniform1f(uLightAngle, 0.7);

  let animId = 0;
  const dpr = Math.min(window.devicePixelRatio, 2);

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  const startTime = performance.now();
  function render() {
    const t = (performance.now() - startTime) * 0.001;
    gl!.uniform1f(uTime, t);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);

  return {
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    },
    get gl() { return gl; },
    get uFabricFreq() { return uFabricFreq; },
  };
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !ready) return;
    const fabric = initFabricCanvas(canvasRef.current);
    if (!fabric) return;

    // Scroll-driven fabric warp
    if (sectionRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const freq = 1.0 + self.progress * 4.0;
          if (fabric.gl) {
            fabric.gl.uniform1f(fabric.uFabricFreq, freq);
          }
        },
      });

      return () => {
        fabric.destroy();
        st.kill();
      };
    }

    return () => fabric.destroy();
  }, [ready]);

  useEffect(() => {
    if (!titleRef.current || !ready) return;
    gsap.fromTo(
      titleRef.current.children,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
    );
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* WebGL Fabric Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Hero Content */}
      <div
        ref={titleRef}
        className="relative z-10 text-center px-6 max-w-[900px]"
      >
        <p
          className="font-serif text-[48px] md:text-[96px] font-normal leading-[1.0] tracking-[-2px] text-fashion-black"
          style={{ textShadow: '0 2px 40px rgba(255,255,255,0.8)' }}
        >
          THE
        </p>
        <p
          className="font-serif text-[72px] md:text-[140px] font-normal leading-[0.95] tracking-[-2px] text-fashion-black"
          style={{ textShadow: '0 2px 40px rgba(255,255,255,0.8)' }}
        >
          ALGORITHMIC
        </p>
        <p
          className="font-serif text-[72px] md:text-[140px] font-normal leading-[0.95] tracking-[-2px] text-fashion-black"
          style={{ textShadow: '0 2px 40px rgba(255,255,255,0.8)' }}
        >
          DRAPE
        </p>

        <p className="font-sans text-base md:text-lg text-fashion-muted mt-8 tracking-wide">
          House of Zuri &middot; Contemporary womenswear studio &middot; Crafted for modern African confidence.
        </p>

        <div className="flex items-center justify-center gap-4 mt-12">
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-sans text-sm tracking-[1px] uppercase px-8 py-4 bg-fashion-black text-white hover:bg-fashion-indigo transition-colors duration-300"
          >
            VIEW PORTFOLIO
          </a>
          <a
            href={new URL('../../media/docs/House-of-Zuri-CV.pdf', import.meta.url).href}
            download="House-of-Zuri-CV.pdf"
            className="font-sans text-sm tracking-[1px] uppercase px-8 py-4 border border-fashion-black text-fashion-black hover:bg-fashion-black hover:text-white transition-all duration-300"
          >
            DOWNLOAD CV
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="w-px h-10 bg-fashion-indigo animate-pulse" />
      </div>
    </section>
  );
}
