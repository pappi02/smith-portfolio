import { experiences, skills } from '@/data/content';

export default function Experience() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24 md:px-12">
      <div className="max-w-5xl space-y-16">
        <section>
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">House of Zuri</p>
          <h1 className="mt-6 text-5xl font-serif">A Kenyan contemporary womenswear studio</h1>
          <p className="mt-6 max-w-3xl text-base text-white/70">
            House of Zuri is a design-led fashion studio focused on thoughtful womenswear, quality craftsmanship, and modern African elegance. Founded by a fashion designer and a software developer, the studio creates ready-to-wear and custom garments that celebrate confidence, individuality, and local craftsmanship.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div key={experience.company} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{experience.role}</p>
                <h2 className="mt-3 text-3xl font-serif">{experience.company}</h2>
                <p className="mt-2 text-sm text-white/70">{experience.startDate} — {experience.endDate}</p>
                <ul className="mt-5 space-y-3 text-sm text-white/70 list-disc list-inside">
                  {experience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <aside className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Co-Founder & Creative Director</p>
              <h2 className="mt-3 text-3xl font-serif">Smith Muturi</h2>
              <p className="mt-4 text-sm text-white/70">
                Co-founder and Creative Director at House of Zuri, leading design vision, womenswear development, pattern engineering, photography direction, and studio execution.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif">Design Philosophy</h3>
              <p className="mt-4 text-sm text-white/70">
                We balance modern silhouettes with local craftsmanship, thoughtful materials, and confident details to create garments that feel both elegant and wearable.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif">Core Skills</h2>
              <div className="space-y-4 mt-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-white" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
