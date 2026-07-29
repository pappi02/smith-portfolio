import { Link } from 'react-router-dom';
import { projects } from '@/data/content';
import ResponsiveImage from '@/components/ResponsiveImage';

const cvUrl = new URL('../../media/docs/House-of-Zuri-CV.pdf', import.meta.url).href;

export default function Home() {
  const featured = projects.filter((project) => project.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pt-24 pb-20 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Contemporary Womenswear Studio</p>
              <h1 className="text-display-1 text-white">HOUSE OF ZURI</h1>
              <p className="max-w-2xl text-xl leading-9 text-white/70">
                House of Zuri is a Kenyan contemporary womenswear brand focused on thoughtful design, quality craftsmanship, and modern African elegance. Founded by a fashion designer and a software developer, we create ready-to-wear and custom garments that celebrate confidence, individuality, and local craftsmanship.
              </p>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Co-Founder & Creative Director</p>
                <p className="text-lg font-semibold text-white">Smith Muturi</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/work"
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                >
                  Explore Collections
                </Link>
                <a
                  href={cvUrl}
                  download="House-of-Zuri-CV.pdf"
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                >
                  Download CV
                </a>
                <Link
                  to="/contact"
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                >
                  Work With House of Zuri
                </Link>
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(255,255,255,0.05)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white/5">
                <ResponsiveImage src={new URL('../../media/pieces/floral khaftan dress.jpg', import.meta.url).href} alt="Featured fashion" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">House of Zuri</p>
              <h2 className="mt-4 text-4xl font-serif">Design archive.</h2>
            </div>
            <Link
              to="/work"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
              >
                <ResponsiveImage
                  src={project.coverImage}
                  alt={project.title}
                  preserveAspect
                  maxHeight={{ sm: 140, md: 200 }}
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{project.category.replace('-', ' ')}</p>
                  <h3 className="text-2xl font-serif">{project.title}</h3>
                  <p className="text-sm leading-6 text-white/70">{project.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

