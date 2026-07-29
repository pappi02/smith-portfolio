// Portfolio Content Data
// All content is typed and structured — no hardcoded strings in components

import type { Project, Collection, Service, Experience, Skill, Sprint, TechStackItem, WireframePage, DataModel } from '@/types';

const piece = (fileName: string) => new URL(`../../media/pieces/${fileName}`, import.meta.url).href;

export const projects: Project[] = [
  {
    id: 'sahara-khaftan',
    slug: 'sahara-khaftan',
    title: 'Sahara Khaftan',
    subtitle: 'Hand-cut khaftan silhouettes with botanical prints and sculptural sleeves',
    category: 'african-fashion',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'Editorial Commission',
    duration: '3 weeks',
    coverImage: piece('floral khaftan dress.jpg'),
    gallery: [
      piece('floral khaftan dress.jpg'),
      piece('green white khaftan.jpg'),
      piece('black green khaftan.jpg'),
    ],
    tools: ['CLO 3D', 'Adobe Illustrator', 'Wilcom'],
    materials: ['Wax Print', 'Silk', 'Beaded Trim'],
    tags: ['african-fashion', 'print', 'couture'],
    challenge: 'Balance oversized African drape with precise tailoring for editorial movement.',
    solution: 'Combined printed khaftan panels with a fitted underlayer and sculpted sleeve volume.',
    process: [
      { title: 'Mood & Print', description: 'Developed a botanical print palette inspired by East African foliage.', images: [piece('floral khaftan dress.jpg')] },
      { title: 'Draping', description: 'Created exaggerated shoulder fullness on the dress form for volume control.', images: [piece('green white khaftan.jpg')] },
      { title: 'Render & Fit', description: 'Validated fit in CLO 3D before final stitching and hand finish.', images: [piece('black green khaftan.jpg')] },
    ],
    results: 'Published in local fashion editorial and commissioned by two clients for bespoke khaftans.',
    seo: { title: 'Sahara Khaftan | House of Zuri', description: 'African fashion khaftan with botanical print', keywords: ['khaftan', 'African fashion', 'editorial'], ogImage: piece('floral khaftan dress.jpg') },
  },
  {
    id: 'noir-tailoring',
    slug: 'noir-tailoring',
    title: 'Noir Tailoring',
    subtitle: 'Sculptural suiting with dramatic volume for evening events',
    category: 'evening-wear',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'Atelier Client',
    duration: '2 weeks',
    coverImage: piece('Black suit.jpg'),
    gallery: [
      piece('Black suit.jpg'),
      piece('white suit.jpg'),
      piece('yellow suit.jpg'),
    ],
    tools: ['CLO 3D', 'Adobe Illustrator', 'Photoshop'],
    materials: ['Wool Crepe', 'Silk Lining', 'Canvas Interfacing'],
    tags: ['evening-wear', 'tailoring', 'suiting'],
    challenge: 'Create a black evening suit that reads as couture while retaining clean tailoring.',
    solution: 'Used strong shoulder lines, trimmed waist, and refined details to deliver modern structure.',
    process: [
      { title: 'Pattern Design', description: 'Translated sharp suiting lines into a fluid, high-fashion silhouette.', images: [piece('Black suit.jpg')] },
      { title: 'Mockup', description: 'Tested fit with muslin samples to ensure comfort and drama.', images: [piece('white suit.jpg')] },
      { title: 'Finish', description: 'Applied hand-pressed creases and tonal topstitching for polish.', images: [piece('yellow suit.jpg')] },
    ],
    results: 'Worn for a high-profile launch event and shared across fashion press channels.',
    seo: { title: 'Noir Tailoring | House of Zuri', description: 'Structured evening suiting', keywords: ['suit', 'tailoring', 'evening wear'], ogImage: piece('Black suit.jpg') },
  },
  {
    id: 'ivory-wave',
    slug: 'ivory-wave',
    title: 'Ivory Wave',
    subtitle: 'Soft bridal styling with draped volume and tonal elegance',
    category: 'bridal',
    featured: true,
    year: 2024,
    status: 'completed',
    client: 'Bridal Client',
    duration: '4 weeks',
    coverImage: piece('white maxidress.jpg'),
    gallery: [
      piece('white maxidress.jpg'),
      piece('white and brown maxidress.jpg'),
      piece('offshoulder shiftdress.jpg'),
    ],
    tools: ['CLO 3D', 'Adobe Illustrator'],
    materials: ['Silk Satin', 'Chiffon', 'Hand-sewn Beads'],
    tags: ['bridal', 'draping', 'soft couture'],
    challenge: 'Design a bridal look that moves effortlessly without losing structure.',
    solution: 'Layered draped panels over a sculpted under bodice to create flow with support.',
    process: [
      { title: 'Inspiration', description: 'Pulled from coastal light and soft ivory textures.', images: [piece('white maxidress.jpg')] },
      { title: 'Draping', description: 'Created cascading fabric shapes on a dress form for fluid motion.', images: [piece('white and brown maxidress.jpg')] },
      { title: 'Construction', description: 'Assembled and finished with delicate hand-sewn trims.', images: [piece('offshoulder shiftdress.jpg')] },
    ],
    results: 'Selected for a bridal lookbook and invited inquiries from 10 new clients.',
    seo: { title: 'Ivory Wave | House of Zuri', description: 'Soft bridal gown with tonal draping', keywords: ['bridal', 'wedding dress', 'draping'], ogImage: piece('white maxidress.jpg') },
  },
  {
    id: 'sunset-wrap',
    slug: 'sunset-wrap',
    title: 'Sunset Wrap',
    subtitle: 'Resort-inspired wrap dresses designed for relaxed luxury',
    category: 'casual',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'Lifestyle Editorial',
    duration: '2 weeks',
    coverImage: piece('pink wrapdress.jpg'),
    gallery: [
      piece('pink wrapdress.jpg'),
      piece('orange shiftdress.jpg'),
      piece('yellow maxidress.jpg'),
    ],
    tools: ['Adobe Illustrator', 'CLO 3D'],
    materials: ['Cotton Voile', 'Silk Blend', 'Natural Dyes'],
    tags: ['casual', 'resortwear', 'wrap dress'],
    challenge: 'Create easy-to-wear silhouettes with elevated print and color flow.',
    solution: 'Designed wrap and bias-cut shapes that drape naturally across the body.',
    process: [
      { title: 'Color Study', description: 'Selected warm tones and relaxed shapes for everyday luxury.', images: [piece('pink wrapdress.jpg')] },
      { title: 'Pattern Drafting', description: 'Created adjustable wrap constructions for multiple fit options.', images: [piece('orange shiftdress.jpg')] },
      { title: 'Final Styling', description: 'Styled with minimal accessories to highlight the garments.', images: [piece('yellow maxidress.jpg')] },
    ],
    results: 'Featured in a seasonal lifestyle campaign and licensed for two product shoots.',
    seo: { title: 'Sunset Wrap | House of Zuri', description: 'Resort wrap dress collection', keywords: ['wrap dress', 'resort wear', 'casual fashion'], ogImage: piece('pink wrapdress.jpg') },
  },
  {
    id: 'midnight-cape',
    slug: 'midnight-cape',
    title: 'Midnight Cape',
    subtitle: 'Sculptural black gown with cape detail and sharp edge work',
    category: 'evening-wear',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'Fashion Showcase',
    duration: '3 weeks',
    coverImage: piece('long black cape dress.jpg'),
    gallery: [
      piece('long black cape dress.jpg'),
      piece('red long bodycondress.jpg'),
      piece('black net bodycondress.jpg'),
    ],
    tools: ['CLO 3D', 'Adobe Illustrator'],
    materials: ['Mesh', 'Stretch Satin', 'Boning'],
    tags: ['evening-wear', 'couture', 'caped gown'],
    challenge: 'Produce an evening gown that feels weightless while retaining bold structure.',
    solution: 'Combined cape drape with precise bodycon construction and mesh detailing.',
    process: [
      { title: 'Silhouette', description: 'Outlined the cape and fitted bodice to flow seamlessly together.', images: [piece('long black cape dress.jpg')] },
      { title: 'Fabric Test', description: 'Matched stretch satin with mesh inserts for dynamic movement.', images: [piece('red long bodycondress.jpg')] },
      { title: 'Assembly', description: 'Secured caped panels with hidden stitching for a clean finish.', images: [piece('black net bodycondress.jpg')] },
    ],
    results: 'Featured in an evening fashion editorial and booked for a red carpet appearance.',
    seo: { title: 'Midnight Cape | House of Zuri', description: 'Black caped evening gown', keywords: ['evening gown', 'cape', 'couture'], ogImage: piece('long black cape dress.jpg') },
  },
  {
    id: 'forest-sundress',
    slug: 'forest-sundress',
    title: 'Forest Sundress',
    subtitle: 'Daywear collection inspired by green hues and organic movement',
    category: 'african-fashion',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'Lifestyle Campaign',
    duration: '3 weeks',
    coverImage: piece('green long sundress.jpg'),
    gallery: [
      piece('green long sundress.jpg'),
      piece('animal print dress.jpg'),
      piece('green white khaftan.jpg'),
    ],
    tools: ['CLO 3D', 'Illustrator'],
    materials: ['Cotton', 'Viscose', 'Printed Fabric'],
    tags: ['african-fashion', 'daywear', 'sundress'],
    challenge: 'Create daywear that feels fresh, directional, and easy to wear.',
    solution: 'Used lightweight panels and curved hems to create effortless motion in every look.',
    process: [
      { title: 'Silhouette Study', description: 'Tested relaxed dress shapes for comfortable summer wear.', images: [piece('green long sundress.jpg')] },
      { title: 'Print Pairing', description: 'Matched animal and botanical prints within a tonal palette.', images: [piece('animal print dress.jpg')] },
      { title: 'Stitching', description: 'Finished edges with minimal seams for a clean finish.', images: [piece('green white khaftan.jpg')] },
    ],
    results: 'Deployed in a brand editorial and leveraged as a signature summer series.',
    seo: { title: 'Forest Sundress | House of Zuri', description: 'Green-inspired daywear collection', keywords: ['sundress', 'daywear', 'African fashion'], ogImage: piece('green long sundress.jpg') },
  },
];

export const collections: Collection[] = [
  {
    id: 'chromatic-construct',
    slug: 'chromatic-construct',
    title: 'Chromatic Construct',
    season: 'SS',
    year: 2025,
    description: 'Exploring the intersection of architectural tailoring and vibrant textile art.',
    coverImage: piece('floral khaftan dress.jpg'),
    projectIds: ['sahara-khaftan', 'noir-tailoring', 'forest-sundress'],
  },
  {
    id: 'monolith',
    slug: 'monolith',
    title: 'Monolith',
    season: 'FW',
    year: 2024,
    description: 'A study in monochrome — exploring texture, form, and silhouette through a restricted palette.',
    coverImage: piece('long black cape dress.jpg'),
    projectIds: ['ivory-wave', 'midnight-cape', 'sunset-wrap'],
  },
];

export const services: Service[] = [
  { id: 'fashion-design', title: 'Fashion Design', description: 'Custom garment design from concept to final piece. Specializing in evening wear, bridal, and African fusion.', icon: 'Palette', gallery: [piece('floral khaftan dress.jpg')] },
  { id: 'pattern-drafting', title: 'Pattern Drafting', description: 'Precision flat pattern drafting and draping for bespoke and ready-to-wear collections.', icon: 'PenTool', gallery: [piece('green long sundress.jpg')] },
  { id: 'clo3d', title: 'CLO 3D Visualization', description: 'Photorealistic 3D garment simulation for pre-production validation and digital lookbooks.', icon: 'Box', gallery: [piece('white maxidress.jpg')] },
  { id: 'embroidery', title: 'Embroidery Digitizing', description: 'Custom embroidery design and digitizing for Wilcom and Tajima machines.', icon: 'Sparkles', gallery: [piece('black net bodycondress.jpg')] },
  { id: 'textile-printing', title: 'Textile Printing', description: 'Digital and screen printing on fabric. Custom repeat patterns and placement prints.', icon: 'Printer', gallery: [piece('yellow maxidress.jpg')] },
  { id: 'photography', title: 'Fashion Photography', description: 'Editorial and lookbook photography with complete art direction and post-production.', icon: 'Camera', gallery: [piece('long black cape dress.jpg')] },
];

export const experiences: Experience[] = [
  {
    company: 'Smiles and Styles',
    role: 'Fashion Illustrator & Pattern Drafter',
    startDate: '2025-01',
    endDate: '2026-03',
    description: [
      'Created fashion illustrations and concept designs using CLO 3D and hand-drawn techniques to guide garment creation.',
      'Drafted garment patterns with CLO 3D and Adobe Illustrator as well as manual methods, refining patterns for accurate fit and precision.',
      'Constructed garments through cutting, assembling, and sewing, ensuring high-quality finishes and close collaboration with design teams.',
    ],
  },
  {
    company: 'Ashton Mombasa Apparel',
    role: 'Production Supervisor',
    startDate: '2025-06',
    endDate: '2025-12',
    description: [
      'Supervised daily garment production operations, monitored workflow, and maintained quality control standards.',
      'Trained new employees on production processes, machine handling, and workflow procedures.',
      'Led a production team and acted as a communication link between management and workers to promote productivity and discipline.',
    ],
  },
  {
    company: 'Todosta Uniform Center',
    role: 'Graphic Designer, Textile Printing Director, Embroidery Machine Operator, Fashion Photographer, Garment Production Assistant',
    startDate: '2024-05',
    endDate: '2025-05',
    description: [
      'Designed creative and technically precise fashion and branding assets including logos, garment graphics, brochures, flyers, and business cards using Adobe Illustrator and Photoshop.',
      'Led textile printing processes for screen printing and digital fabric printing, ensuring accurate color reproduction, fabric compatibility, and high-quality finishes.',
      'Operated and managed a Tajima 8-head embroidery machine while digitizing designs in Wilcom Embroidery Software with a focus on stitch density, thread pathing, and durability.',
      'Directed fashion photography shoots for uniforms and apparel collections, applying lighting, composition, styling, and Photoshop retouching for marketing campaigns.',
      'Assisted garment construction and sewing for uniform production, ensuring quality stitching, fit, and durability.',
    ],
  },
];

export const skills: Skill[] = [
  { name: 'Fashion Design', level: 95, category: 'Design' },
  { name: 'Pattern Drafting', level: 90, category: 'Design' },
  { name: 'CLO 3D Visualization', level: 85, category: 'Software' },
  { name: 'Adobe Illustrator', level: 90, category: 'Software' },
  { name: 'Embroidery Design', level: 85, category: 'Production' },
  { name: 'Fashion Photography', level: 80, category: 'Design' },
  { name: 'Textile Printing', level: 75, category: 'Production' },
  { name: 'Production Supervision', level: 85, category: 'Production' },
];

export const techStack: TechStackItem[] = [
  { name: 'React 19', category: 'Core Framework', description: 'UI library with concurrent rendering, server components, and automatic batching for 60fps interactions.', icon: 'Code2' },
  { name: 'TypeScript 5', category: 'Language', description: 'Type-safe development with strict null checks, enabling compile-time confidence across all data models.', icon: 'FileType' },
  { name: 'Vite 6', category: 'Build Tool', description: 'Sub-second cold starts, instant HMR, and optimized Rollup production builds with zero config.', icon: 'Zap' },
  { name: 'Tailwind CSS 4', category: 'Styling', description: 'Utility-first CSS with design tokens, dark mode support, and JIT compilation for minimal bundle size.', icon: 'Palette' },
  { name: 'Framer Motion', category: 'Animation', description: 'Declarative React animations, gesture support, and AnimatePresence for enter/exit transitions.', icon: 'Sparkles' },
  { name: 'GSAP + ScrollTrigger', category: 'Animation', description: 'Industry-standard scroll-driven animations, pinned sections, and scrubbed timelines.', icon: 'TrendingUp' },
  { name: 'React Router v7', category: 'Routing', description: 'Hash-based client-side routing for GitHub Pages / static hosting compatibility.', icon: 'Route' },
  { name: 'Zustand', category: 'State', description: 'Lightweight atomic state management with middleware support for persistence and devtools.', icon: 'Database' },
  { name: 'Zod', category: 'Validation', description: 'Schema-first validation for forms, API responses, and content type safety at runtime.', icon: 'ShieldCheck' },
];

export const sprints: Sprint[] = [
  { number: 1, title: 'Foundation', duration: 'Week 1-2', tasks: ['Initialize React 19 + Vite + TypeScript project', 'Configure Tailwind CSS with design tokens', 'Set up folder structure (app/pages/widgets/features/entities/shared)', 'Implement React Router v7 with hash routing', 'Build layout system (MainLayout with Nav + Footer)'] },
  { number: 2, title: 'Content Layer', duration: 'Week 3-4', tasks: ['Define TypeScript interfaces for all content types', 'Create JSON content files for projects, collections, services, experience', 'Build content loader utilities with Zod validation', 'Implement dynamic routing for /work/:slug'] },
  { number: 3, title: 'Core Pages', duration: 'Week 5-6', tasks: ['Build Home page (Hero, Featured Work, Capabilities, Process, CTA)', 'Build Work page with category filtering and masonry grid', 'Build Project Detail page with gallery and process steps'] },
  { number: 4, title: 'Supporting Pages', duration: 'Week 7-8', tasks: ['Build About/Experience page with timeline', 'Build Services page with capability cards', 'Build Contact page with project inquiry form', 'Implement form validation with Zod + React Hook Form'] },
  { number: 5, title: 'Polish', duration: 'Week 9-10', tasks: ['Add GSAP ScrollTrigger animations to all sections', 'Implement page transitions with Framer Motion AnimatePresence', 'Add image lazy loading with blur placeholders', 'Build and optimize for 95+ Lighthouse score'] },
  { number: 6, title: 'Launch', duration: 'Week 11-12', tasks: ['Final responsive testing (mobile-first)', 'SEO meta tags, Open Graph images, structured data', 'Generate downloadable portfolio PDF', 'Deploy to static hosting'] },
];

export const wireframePages: WireframePage[] = [
  { id: 'home', name: 'HOME', route: '/', purpose: 'Discovery — First impression, showcases featured work and capabilities', sections: ['Hero', 'Featured Work', 'Capabilities', 'Process Timeline', 'Experience Highlights', 'CTA'] },
  { id: 'work', name: 'WORK', route: '/work', purpose: 'Exploration — Browse all projects with category filtering', sections: ['Filter Bar', 'Masonry Grid', 'Featured Projects'] },
  { id: 'project', name: 'PROJECT', route: '/work/:slug', purpose: 'Deep Dive — Full project story with process and gallery', sections: ['Banner', 'Overview', 'Challenge', 'Process Steps', 'Gallery', 'Tools Used'] },
  { id: 'about', name: 'ABOUT', route: '/experience', purpose: 'Credibility — Experience, skills, and education', sections: ['Profile', 'Experience Timeline', 'Skills', 'Education'] },
  { id: 'contact', name: 'CONTACT', route: '/contact', purpose: 'Conversion — Project inquiry and contact details', sections: ['Project Form', 'Contact Info', 'Social Links'] },
];

export const dataModels: DataModel[] = [
  {
    id: 'project',
    name: 'PROJECT',
    code: `interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'evening-wear' | 'bridal'
    | 'streetwear' | 'african-fashion'
    | 'uniforms' | 'casual';
  featured: boolean;
  year: number;
  status: 'completed' | 'concept'
    | 'production';
  client?: string;
  duration?: string;
  coverImage: string;
  gallery: string[];
  videos?: string[];
  tools: string[];
  materials: string[];
  tags: string[];
  challenge: string;
  solution: string;
  process: ProcessStep[];
  results: string;
  seo: SEO;
}`,
  },
  {
    id: 'collection',
    name: 'COLLECTION',
    code: `interface Collection {
  id: string;
  slug: string;
  title: string;
  season: string;
  year: number;
  description: string;
  coverImage: string;
  projectIds: string[];
}`,
  },
  {
    id: 'service',
    name: 'SERVICE',
    code: `interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gallery: string[];
}`,
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    code: `interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}`,
  },
  {
    id: 'skill',
    name: 'SKILL',
    code: `interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Design' | 'Software'
    | 'Production';
}`,
  },
];
