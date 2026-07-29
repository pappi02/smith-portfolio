import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import ResponsiveImage from '@/components/ResponsiveImage';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20">
      <Link to={`/work/${project.slug}`} className="block">
        <ResponsiveImage
          src={project.coverImage}
          alt={project.title}
          preserveAspect
          maxHeight={{ sm: 140, md: 200 }}
          className="w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/70">
          <span>{project.category.replace('-', ' ')}</span>
          <span>{project.year}</span>
        </div>
        <h2 className="text-2xl font-serif text-white">
          <Link to={`/work/${project.slug}`}>{project.title}</Link>
        </h2>
        <p className="text-sm leading-6 text-white/70">{project.subtitle}</p>
      </div>
    </article>
  );
}
