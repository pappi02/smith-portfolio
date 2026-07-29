import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/content';
import ProjectCard from '@/components/ProjectCard';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'african-fashion', label: 'African Fashion' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'evening-wear', label: 'Evening Wear' },
  { value: 'casual', label: 'Casual' },
  { value: 'streetwear', label: 'Streetwear' },
];

export default function Work() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const visibleProjects = useMemo(
    () => (category === 'all' ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 py-24 md:px-12">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Collections</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <h1 className="text-5xl font-serif">House of Zuri Collections</h1>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              Back
            </button>
          </div>
          <p className="mt-6 max-w-2xl text-base text-white/70">A curated selection of House of Zuri projects designed to showcase our womenswear collections, studio capabilities, and creative direction.</p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-12 md:px-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCategory(item.value)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                category === item.value
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/10 text-white/80 hover:border-white/40 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
