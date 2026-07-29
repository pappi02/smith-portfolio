import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check } from 'lucide-react';
import { dataModels } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

// Simple syntax highlighter for TypeScript interfaces
function highlightCode(code: string): string {
  return code
    .replace(/\b(interface|type|const|let|var|export|import|from|default|return|if|else|for|while)\b/g, '<span class="text-[#4D00FF]">$1</span>')
    .replace(/\b(string|number|boolean|void|any|never|unknown|null|undefined)\b/g, '<span class="text-[#4EC9B0]">$1</span>')
    .replace(/(\w+)(\??:\s)/g, '<span class="text-[#9CDCFE]">$1</span>$2')
    .replace(/'[^']*'/g, '<span class="text-[#CE9178]">$&</span>')
    .replace(/\/\/.*$/gm, '<span class="text-[#6A9955]">$&</span>');
}

export default function DataModelsSection() {
  const [activeTab, setActiveTab] = useState('project');
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const activeModel = dataModels.find((m) => m.id === activeTab);

  const handleCopy = () => {
    if (activeModel) {
      navigator.clipboard.writeText(activeModel.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!codeRef.current) return;
    gsap.fromTo(
      codeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="lab" className="w-full bg-fashion-void section-padding">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            04 · CONTENT MODELING
          </p>
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-[1.0] tracking-[-1px] text-white mb-4">
            Everything Is Data
          </h2>
          <p className="font-sans text-lg text-white/60 max-w-[600px] mx-auto">
            Type-safe content schemas power every section. No hardcoded text — every word flows from structured data.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-10 border-b border-white/10">
          {dataModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveTab(model.id)}
              className={`font-sans text-sm uppercase tracking-[1px] px-6 py-3 border-b-2 transition-all duration-300 ${
                activeTab === model.id
                  ? 'border-fashion-indigo text-white'
                  : 'border-transparent text-fashion-muted hover:text-white'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div
          ref={codeRef}
          className="relative bg-[#0A0A0A] border border-white/10 rounded p-6 md:p-8 overflow-x-auto"
        >
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 text-fashion-muted hover:text-white transition-colors p-2"
            aria-label="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {/* Code */}
          <pre className="font-mono text-sm leading-[1.6]">
            <code
              dangerouslySetInnerHTML={{
                __html: activeModel ? highlightCode(activeModel.code) : '',
              }}
            />
          </pre>
        </div>

        {/* Schema Note */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[11px] text-fashion-muted">
            All schemas validated at runtime with{' '}
            <span className="text-fashion-indigo">Zod</span>. TypeScript provides compile-time safety.
          </p>
        </div>
      </div>
    </section>
  );
}
