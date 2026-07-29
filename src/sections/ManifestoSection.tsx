import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  'GARMENTS ARE SPATIAL ALGORITHMS...',
  'FASHION IS THE INTERFACE...',
  'THREAD IS CODE...',
  'FORM FOLLOWS FABRIC...',
  'PATTERNS ARE PROGRAMS...',
];

const TYPING_SPEED = 120;
const DELETING_SPEED = 50;
const PAUSE_COMPLETE = 2000;

export default function ManifestoSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentWord = PHRASES[loopNum % PHRASES.length];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.substring(0, prev.length - 1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 >= currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), PAUSE_COMPLETE);
        }
      }, TYPING_SPEED + Math.random() * 80);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center bg-fashion-void overflow-hidden"
    >
      <div ref={contentRef} className="relative px-6 opacity-0">
        {/* Corner Brackets */}
        <div className="absolute -top-8 -left-8 w-5 h-px bg-fashion-indigo" />
        <div className="absolute -top-8 -left-8 w-px h-5 bg-fashion-indigo" />
        <div className="absolute -top-8 -right-8 w-5 h-px bg-fashion-indigo" />
        <div className="absolute -top-8 -right-8 w-px h-5 bg-fashion-indigo" style={{ right: '-32px', left: 'auto' }} />
        <div className="absolute -bottom-8 -left-8 w-5 h-px bg-fashion-indigo" />
        <div className="absolute -bottom-8 -left-8 w-px h-5 bg-fashion-indigo" style={{ bottom: '-32px', top: 'auto' }} />
        <div className="absolute -bottom-8 -right-8 w-5 h-px bg-fashion-indigo" />
        <div className="absolute -bottom-8 -right-8 w-px h-5 bg-fashion-indigo" style={{ bottom: '-32px', top: 'auto', right: '-32px', left: 'auto' }} />

        {/* Schema Label */}
        <div className="absolute -top-14 left-0 font-mono text-[10px] uppercase tracking-[2px] text-fashion-muted">
          SCHEMA v1.0.{loopNum % 10}
        </div>

        {/* Typewriter Text */}
        <h2 className="font-mono text-xl md:text-4xl lg:text-5xl text-white tracking-[2px] leading-[1.3] min-h-[80px] md:min-h-[120px]">
          {text}
          <span className="inline-block w-[3px] h-[1em] bg-fashion-indigo ml-1 align-middle animate-pulse" />
        </h2>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {PHRASES.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: i === loopNum % PHRASES.length ? '#4D00FF' : '#333',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
