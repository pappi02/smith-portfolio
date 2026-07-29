import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2, FileType, Zap, Palette, Sparkles, TrendingUp,
  Route, Database, ShieldCheck,
} from 'lucide-react';
import { techStack } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  FileType: <FileType size={24} />,
  Zap: <Zap size={24} />,
  Palette: <Palette size={24} />,
  Sparkles: <Sparkles size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Route: <Route size={24} />,
  Database: <Database size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
};

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
        );
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-fashion-offwhite section-padding">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            02 · TECHNOLOGY
          </p>
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black">
            The Engineering Stack
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-white p-8 rounded shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 opacity-0"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-fashion-indigo/5 flex items-center justify-center text-fashion-indigo mb-4">
                {iconMap[tech.icon]}
              </div>

              {/* Name */}
              <h3 className="font-sans text-xl font-medium text-fashion-black mb-1">
                {tech.name}
              </h3>

              {/* Category */}
              <p className="font-mono text-[11px] uppercase tracking-[1px] text-fashion-muted mb-3">
                {tech.category}
              </p>

              {/* Description */}
              <p className="font-sans text-sm text-fashion-black leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
