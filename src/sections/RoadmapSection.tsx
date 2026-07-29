import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sprints } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionElement = sectionRef.current
    const timelineElement = timelineRef.current
    if (!sectionElement || !timelineElement) return;

    // Progress line animation
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineElement,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      );
    }

    // Card animations
    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -30 : 30;
      gsap.fromTo(
        card,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card!,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === timelineElement || cards.includes(st.trigger as HTMLDivElement)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white section-padding">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            05 · EXECUTION
          </p>
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black">
            From Blueprint to Launch
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2" />
          <div
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-fashion-indigo origin-top -translate-x-1/2"
            style={{ transform: 'translateX(-50%) scaleY(0)' }}
          />

          {/* Sprint Nodes */}
          <div className="space-y-12">
            {sprints.map((sprint, i) => (
              <div
                key={sprint.number}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative flex items-start gap-6 md:gap-12 opacity-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-fashion-indigo shadow-[0_0_0_4px_rgba(77,0,255,0.2)]" />
                </div>

                {/* Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[45%] ${
                    i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div className="bg-white border border-gray-200 rounded p-6 md:p-8 hover:border-fashion-indigo hover:shadow-[0_4px_16px_rgba(77,0,255,0.08)] transition-all duration-300">
                    <p className="font-mono text-xs uppercase tracking-[1px] text-fashion-indigo mb-2">
                      Sprint {String(sprint.number).padStart(2, '0')}
                    </p>
                    <h3 className="font-sans text-xl md:text-2xl font-medium text-fashion-black mb-1">
                      {sprint.title}
                    </h3>
                    <p className="font-mono text-[11px] text-fashion-muted mb-4">
                      {sprint.duration}
                    </p>
                    <ul className="space-y-2">
                      {sprint.tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-fashion-indigo mt-2 flex-shrink-0" />
                          <span className="font-sans text-sm text-fashion-black leading-relaxed">
                            {task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
