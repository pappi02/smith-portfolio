// Content Schemas for House of Zuri
// Domain-driven content architecture — all content flows from typed data

export interface ProcessStep {
  title: string;
  description: string;
  images: string[];
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'evening-wear' | 'bridal' | 'streetwear' | 'african-fashion' | 'uniforms' | 'casual';
  featured: boolean;
  year: number;
  status: 'completed' | 'concept' | 'production';
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
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  season: string;
  year: number;
  description: string;
  coverImage: string;
  projectIds: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gallery: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'Design' | 'Software' | 'Production';
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image?: string;
  quote: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

export interface SearchItem {
  id: string;
  title: string;
  type: 'project' | 'collection' | 'article';
  tags: string[];
  url: string;
}

export interface TechStackItem {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface Sprint {
  number: number;
  title: string;
  duration: string;
  tasks: string[];
}

export interface WireframePage {
  id: string;
  name: string;
  route: string;
  purpose: string;
  sections: string[];
}

export interface DataModel {
  id: string;
  name: string;
  code: string;
}
