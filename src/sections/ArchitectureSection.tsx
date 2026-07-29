import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder, FolderOpen, FileCode, FileText, ChevronRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    name: 'src',
    type: 'folder',
    description: 'Source code root',
    children: [
      {
        name: 'app',
        type: 'folder',
        description: 'Application bootstrap',
        children: [
          { name: 'router/', type: 'folder', description: 'Hash-based routing config' },
          { name: 'providers/', type: 'folder', description: 'Context providers' },
          { name: 'layouts/', type: 'folder', description: 'Page layout components' },
          { name: 'App.tsx', type: 'file', description: 'Root component' },
        ],
      },
      {
        name: 'pages',
        type: 'folder',
        description: 'Page components (composition only)',
        children: [
          { name: 'HomePage.tsx', type: 'file', description: 'Landing page' },
          { name: 'WorkPage.tsx', type: 'file', description: 'Portfolio grid with filtering' },
          { name: 'ProjectPage.tsx', type: 'file', description: 'Project detail /work/:slug' },
          { name: 'ServicesPage.tsx', type: 'file', description: 'Capabilities showcase' },
          { name: 'ExperiencePage.tsx', type: 'file', description: 'CV timeline' },
          { name: 'ContactPage.tsx', type: 'file', description: 'Project inquiry form' },
        ],
      },
      {
        name: 'widgets',
        type: 'folder',
        description: 'Large reusable page blocks',
        children: [
          { name: 'Hero/', type: 'folder', description: 'Hero section' },
          { name: 'FeaturedProjects/', type: 'folder', description: 'Project grid' },
          { name: 'Capabilities/', type: 'folder', description: 'Skills display' },
          { name: 'ExperienceTimeline/', type: 'folder', description: 'CV timeline' },
          { name: 'ContactCTA/', type: 'folder', description: 'Contact call-to-action' },
        ],
      },
      {
        name: 'features',
        type: 'folder',
        description: 'User-facing feature modules',
        children: [
          { name: 'SearchProjects/', type: 'folder', description: 'Fuse.js search' },
          { name: 'FilterProjects/', type: 'folder', description: 'Category filtering' },
          { name: 'ContactForm/', type: 'folder', description: 'Zod-validated form' },
          { name: 'LightboxGallery/', type: 'folder', description: 'Image lightbox' },
        ],
      },
      {
        name: 'entities',
        type: 'folder',
        description: 'Business entities with types + UI',
        children: [
          { name: 'project/', type: 'folder', description: 'Project entity' },
          { name: 'collection/', type: 'folder', description: 'Collection entity' },
          { name: 'service/', type: 'folder', description: 'Service entity' },
          { name: 'experience/', type: 'folder', description: 'Experience entity' },
        ],
      },
      {
        name: 'shared',
        type: 'folder',
        description: 'Pure reusable code',
        children: [
          { name: 'ui/', type: 'folder', description: 'Button, Card, Modal, Input' },
          { name: 'animations/', type: 'folder', description: 'FadeUp, RevealText, ScaleIn' },
          { name: 'layouts/', type: 'folder', description: 'Section, Container, Grid' },
        ],
      },
      {
        name: 'content',
        type: 'folder',
        description: 'All portfolio content as data',
        children: [
          { name: 'projects/', type: 'folder', description: 'Project JSON files' },
          { name: 'collections/', type: 'folder', description: 'Collection JSON files' },
          { name: 'services/', type: 'folder', description: 'Service JSON files' },
          { name: 'experience/', type: 'folder', description: 'Experience JSON files' },
        ],
      },
      { name: 'types/', type: 'folder', description: 'Centralized TypeScript interfaces' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    description: 'Static assets',
    children: [
      { name: 'assets/', type: 'folder', description: 'Images, fonts, videos' },
    ],
  },
  { name: 'index.html', type: 'file', description: 'Entry HTML' },
  { name: 'vite.config.ts', type: 'file', description: 'Vite configuration' },
  { name: 'tailwind.config.js', type: 'file', description: 'Tailwind design tokens' },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const [hovered, setHovered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.5 cursor-pointer transition-colors duration-150"
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hasChildren && (
          <span className="text-fashion-muted w-3.5 h-3.5 flex items-center justify-center">
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        )}
        {!hasChildren && <span className="w-3.5" />}

        {node.type === 'folder' ? (
          expanded && hasChildren ? (
            <FolderOpen size={14} className={hovered ? 'text-fashion-indigo' : 'text-fashion-muted'} />
          ) : (
            <Folder size={14} className={hovered ? 'text-fashion-indigo' : 'text-fashion-muted'} />
          )
        ) : node.name.endsWith('.tsx') || node.name.endsWith('.ts') ? (
          <FileCode size={14} className={hovered ? 'text-fashion-indigo' : 'text-fashion-muted'} />
        ) : (
          <FileText size={14} className={hovered ? 'text-fashion-indigo' : 'text-fashion-muted'} />
        )}

        <span
          className={`font-mono text-[13px] transition-colors duration-150 ${
            hovered ? 'text-fashion-indigo' : 'text-fashion-black'
          }`}
        >
          {node.name}
        </span>

        {hovered && node.description && (
          <span className="font-mono text-[10px] text-fashion-muted ml-2 hidden lg:inline">
            — {node.description}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children!.map((child, i) => (
            <TreeItem key={`${child.name}-${i}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    ).fromTo(
      rightRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="atelier"
      className="w-full min-h-[100dvh] bg-white section-padding"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16">
        {/* Left Column */}
        <div ref={leftRef} className="opacity-0">
          <p className="font-mono text-xs uppercase tracking-[2px] text-fashion-indigo mb-4">
            01 · SYSTEM ARCHITECTURE
          </p>
          <h2 className="font-serif text-[48px] md:text-[72px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black mb-6">
            Domain-Driven<br />Blueprint
          </h2>
          <p className="font-sans text-lg text-fashion-black leading-relaxed mb-8">
            The portfolio is architected as a domain-driven enterprise application. Content — projects, 
            collections, services, experience — is modeled as independent entities with typed schemas. 
            This ensures the site can evolve from a static portfolio into a full content management 
            platform without structural rewrites.
          </p>

          {/* Metadata Box */}
          <div className="border border-gray-200 p-6">
            <pre className="font-mono text-[11px] leading-[1.8] text-fashion-black">
{`ARCHITECTURE: Hexagonal / DDD
ROUTING:     React Router v7 (Hash)
STATE:       useState + Zustand
STYLING:     Tailwind CSS 4
ANIMATION:   Framer Motion + GSAP
BUILD:       Vite (zero dependencies)`}
            </pre>
          </div>
        </div>

        {/* Right Column — Folder Tree */}
        <div ref={rightRef} className="opacity-0 bg-fashion-offwhite p-6 md:p-8 overflow-auto max-h-[800px]">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-fashion-muted">
              Project Structure
            </span>
          </div>
          <div className="font-mono">
            {treeData.map((node, i) => (
              <TreeItem key={i} node={node} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
