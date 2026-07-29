// content loader utilities using Vite import.meta.glob

type JsonModule = Record<string, unknown>

export async function getAllProjects() {
  const modules = import.meta.glob('../../content/projects/**/project.json', { as: 'json' }) as Record<string, () => Promise<JsonModule>>
  const loaders = Object.values(modules)
  const results = await Promise.all(loaders.map((loader) => loader()))
  return results
}

export async function getProjectBySlug(slug: string) {
  const projects = await getAllProjects()
  return projects.find((project) => project.slug === slug)
}

export async function getAllCollections() {
  const modules = import.meta.glob('../../content/collections/**/collection.json', { as: 'json' }) as Record<string, () => Promise<JsonModule>>
  const loaders = Object.values(modules)
  return Promise.all(loaders.map((loader) => loader()))
}

export async function getSkills() {
  const mod = await import('../../content/skills/skills.json')
  return mod.default ?? mod
}

export async function getExperience() {
  const mod = await import('../../content/experience/house-of-zuri-experience.json')
  return mod.default ?? mod
}
