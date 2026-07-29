import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '@/data/content';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black px-6 py-24 text-white">
        <h1 className="text-4xl font-serif">Project not found</h1>
        <p className="mt-4 text-white/70">The project you requested does not exist or has not been added yet.</p>
        <button type="button" onClick={() => navigate('/work')} className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10">
          Back to Collections
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 py-24 md:px-12">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">{project.category.replace('-', ' ')}</p>
          <h1 className="mt-6 text-6xl font-serif">{project.title}</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/60">Designed by House of Zuri — Creative Direction by Smith Muturi</p>
        </div>
      </section>
      <section className="px-6 py-12 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <ResponsiveImage src={project.coverImage} preserveAspect maxHeight={{ sm: 220, md: 300 }} alt={project.title} className="w-full rounded-[2rem] object-cover" />
          </div>
          <aside className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="space-y-4">
              <h2 className="text-xl font-serif">Project Overview</h2>
              <p className="text-sm leading-7 text-white/75">{project.challenge}</p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-3xl bg-black/50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Tools Used</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/work" className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10">
              Back to work
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-12 md:px-12">
        <div className="max-w-4xl space-y-8">
          <h2 className="text-3xl font-serif">Gallery</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <ResponsiveImage key={src} src={src} preserveAspect maxHeight={{ sm: 100, md: 180 }} alt={project.title} className="w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
