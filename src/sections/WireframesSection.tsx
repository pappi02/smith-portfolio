import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wireframePages } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

function HomeWireframe() {
  return (
    <div className="w-full h-full bg-[#F4F4F4] p-4 flex flex-col gap-3 overflow-hidden">
      {/* Hero */}
      <div className="h-[35%] bg-[#D0D0D0] rounded flex items-center justify-center relative">
        <span className="font-mono text-[10px] text-fashion-muted uppercase">HERO</span>
        <div className="absolute bottom-2 left-2 right-2 flex gap-2">
          <div className="h-6 flex-1 bg-white/50 rounded" />
          <div className="h-6 w-20 bg-white/50 rounded" />
        </div>
      </div>
      {/* Featured Work */}
      <div className="flex gap-2 flex-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 bg-[#D0D0D0] rounded flex flex-col">
            <div className="flex-1 m-1.5 bg-[#E0E0E0] rounded" />
            <div className="h-3 mx-1.5 mb-1.5 bg-[#E0E0E0] rounded w-3/4" />
          </div>
        ))}
      </div>
      {/* Capabilities */}
      <div className="flex flex-col gap-1.5 py-1">
        {['Fashion Design', 'Pattern Drafting', 'CLO 3D', 'Illustration', 'Embroidery'].map((s, index) => (
          <div key={s} className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-fashion-muted w-20">{s}</span>
            <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div className="h-full bg-fashion-indigo/40 rounded-full" style={{ width: `${60 + (index % 5) * 7}%` }} />
            </div>
          </div>
        ))}
      </div>
      {/* Process */}
      <div className="flex items-center gap-1 py-1">
        {['Research', 'Sketch', 'Pattern', 'CLO 3D', 'Sew', 'Photo'].map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="w-5 h-5 rounded-full bg-fashion-indigo/20 flex items-center justify-center">
              <span className="font-mono text-[6px] text-fashion-indigo">{i + 1}</span>
            </div>
            {i < 5 && <div className="flex-1 h-px bg-[#D0D0D0]" />}
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="h-10 bg-fashion-indigo/10 rounded flex items-center justify-center">
        <span className="font-mono text-[8px] text-fashion-indigo uppercase">Contact CTA</span>
      </div>
    </div>
  );
}

function WorkWireframe() {
  const categories = ['All', 'Evening', 'Bridal', 'Street', 'African'];
  return (
    <div className="w-full h-full bg-[#F4F4F4] p-4 flex flex-col gap-3 overflow-hidden">
      {/* Filter Bar */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((c, i) => (
          <div
            key={c}
            className={`px-3 py-1 rounded-full ${i === 0 ? 'bg-fashion-indigo text-white' : 'bg-white text-fashion-muted'} font-mono text-[8px] uppercase`}
          >
            {c}
          </div>
        ))}
      </div>
      {/* Masonry Grid */}
      <div className="flex gap-2 flex-1">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex-1 flex flex-col gap-2">
            {[0, 1].map((row) => (
              <div
                key={row}
                className="bg-[#D0D0D0] rounded flex flex-col"
                style={{ height: col % 2 === row % 2 ? '55%' : '40%' }}
              >
                <div className="flex-1 m-1.5 bg-[#E0E0E0] rounded" />
                <div className="h-2.5 mx-1.5 mb-1.5 bg-[#E0E0E0] rounded w-2/3" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectWireframe() {
  return (
    <div className="w-full h-full bg-[#F4F4F4] p-4 flex flex-col gap-3 overflow-hidden">
      {/* Banner */}
      <div className="h-[40%] bg-[#D0D0D0] rounded flex items-center justify-center">
        <span className="font-mono text-[10px] text-fashion-muted uppercase">Banner Image</span>
      </div>
      {/* Title Row */}
      <div className="flex gap-3 items-center">
        <div className="h-4 w-32 bg-[#E0E0E0] rounded" />
        <div className="h-3 w-16 bg-[#E0E0E0] rounded" />
        <div className="h-3 w-12 bg-[#E0E0E0] rounded" />
      </div>
      {/* Two Column */}
      <div className="flex gap-3 flex-1">
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-20 bg-fashion-indigo/20 rounded" />
          <div className="h-2 w-full bg-[#E0E0E0] rounded" />
          <div className="h-2 w-5/6 bg-[#E0E0E0] rounded" />
          <div className="h-2 w-4/6 bg-[#E0E0E0] rounded" />
          <div className="mt-2 h-3 w-24 bg-fashion-indigo/20 rounded" />
          <div className="flex gap-1 flex-wrap">
            {['CLO 3D', 'Illustrator', 'Wilcom'].map((t) => (
              <span key={t} className="px-2 py-0.5 bg-white rounded-full font-mono text-[7px] text-fashion-muted">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#D0D0D0] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutWireframe() {
  return (
    <div className="w-full h-full bg-[#F4F4F4] p-4 flex flex-col gap-3 overflow-hidden">
      {/* Profile + Bio */}
      <div className="flex gap-3 h-[35%]">
        <div className="w-[35%] bg-[#D0D0D0] rounded flex items-center justify-center">
          <span className="font-mono text-[8px] text-fashion-muted uppercase">Photo</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 justify-center">
          <div className="h-3 w-24 bg-[#E0E0E0] rounded" />
          <div className="h-2 w-full bg-[#E0E0E0] rounded" />
          <div className="h-2 w-5/6 bg-[#E0E0E0] rounded" />
          <div className="h-2 w-4/6 bg-[#E0E0E0] rounded" />
        </div>
      </div>
      {/* Timeline */}
      <div className="flex-1 flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-fashion-indigo/30" />
              {i < 3 && <div className="w-px h-6 bg-[#D0D0D0]" />}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="h-2.5 w-28 bg-[#E0E0E0] rounded" />
              <div className="h-2 w-20 bg-[#E0E0E0] rounded" />
              <div className="h-2 w-full bg-[#E0E0E0] rounded" />
            </div>
          </div>
        ))}
      </div>
      {/* Skills */}
      <div className="flex flex-col gap-1">
        {['Design', 'Pattern', 'CLO 3D', 'Illustrator'].map((s, index) => (
          <div key={s} className="flex items-center gap-2">
            <span className="font-mono text-[7px] text-fashion-muted w-14">{s}</span>
            <div className="flex-1 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div className="h-full bg-fashion-indigo/40 rounded-full" style={{ width: `${65 + (index % 4) * 6}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactWireframe() {
  return (
    <div className="w-full h-full bg-[#F4F4F4] p-4 flex flex-col gap-3 overflow-hidden">
      {/* Header */}
      <div className="h-6 w-48 bg-[#E0E0E0] rounded mx-auto" />
      {/* Two Column */}
      <div className="flex gap-4 flex-1">
        {/* Form */}
        <div className="flex-1 flex flex-col gap-2">
          {['Project Type', 'Budget Range', 'Timeline'].map((f) => (
            <div key={f} className="flex flex-col gap-1">
              <span className="font-mono text-[7px] text-fashion-muted uppercase">{f}</span>
              <div className="h-6 bg-white rounded border border-[#E0E0E0]" />
            </div>
          ))}
          <span className="font-mono text-[7px] text-fashion-muted uppercase">Description</span>
          <div className="flex-1 bg-white rounded border border-[#E0E0E0] min-h-[40px]" />
          <div className="h-7 bg-fashion-indigo/20 rounded flex items-center justify-center">
            <span className="font-mono text-[8px] text-fashion-indigo uppercase">Send Inquiry</span>
          </div>
        </div>
        {/* Contact Info */}
        <div className="w-[30%] flex flex-col gap-2">
          <div className="h-2.5 w-20 bg-[#E0E0E0] rounded" />
          <div className="h-2 w-24 bg-[#E0E0E0] rounded" />
          <div className="h-2 w-16 bg-[#E0E0E0] rounded" />
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-[#E0E0E0]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const wireframeComponents: Record<string, React.ReactNode> = {
  home: <HomeWireframe />,
  work: <WorkWireframe />,
  project: <ProjectWireframe />,
  about: <AboutWireframe />,
  contact: <ContactWireframe />,
};

export default function WireframesSection() {
  const [activeTab, setActiveTab] = useState('home');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !wireframeRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        gsap.fromTo(
          wireframeRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
        );
      },
    });

    return () => st.kill();
  }, []);

  const activePage = wireframePages.find((p) => p.id === activeTab);

  return (
    <section ref={sectionRef} id="works" className="w-full bg-white section-padding">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            03 · PAGE ARCHITECTURE
          </p>
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black mb-4">
            Five Pages, One Experience
          </h2>
          <p className="font-sans text-lg text-fashion-muted max-w-[600px] mx-auto">
            Each page is architected for a specific user intent — from discovery to conversion.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-10">
          {wireframePages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className={`font-sans text-sm uppercase tracking-[1px] px-6 py-3 border-b-2 transition-all duration-300 ${
                activeTab === page.id
                  ? 'border-fashion-indigo text-fashion-black'
                  : 'border-transparent text-fashion-muted hover:text-fashion-black'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        {/* Wireframe Display */}
        <div
          ref={wireframeRef}
          className="mx-auto opacity-0"
          style={{ maxWidth: '1000px', aspectRatio: '16/10' }}
        >
          <div className="w-full h-full border border-gray-200 rounded overflow-hidden">
            {wireframeComponents[activeTab]}
          </div>
        </div>

        {/* Metadata Panel */}
        {activePage && (
          <div className="max-w-[1000px] mx-auto mt-8 p-6 bg-fashion-offwhite rounded">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <code className="font-mono text-sm bg-fashion-black text-white px-3 py-1.5 rounded">
                {activePage.route}
              </code>
            </div>
            <p className="font-sans text-base text-fashion-black mb-2">
              <strong>Purpose:</strong> {activePage.purpose}
            </p>
            <p className="font-mono text-xs text-fashion-muted">
              <strong className="text-fashion-black">Sections:</strong>{' '}
              {activePage.sections.join(' · ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
