import emailjs from '@emailjs/browser'

export type ContactEmailPayload = {
  projectType: string
  budget: string
  timeline: string
  description: string
  replyTo: string
  to_name?: string
}

type ImportMetaEnv = Record<string, string | undefined>

function getEnv(name: string): string {
  const value = import.meta.env[name as keyof ImportMetaEnv]
  if (!value || typeof value !== 'string') {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const serviceId = getEnv('VITE_EMAILJS_SERVICE_ID')
  const templateId = getEnv('VITE_EMAILJS_TEMPLATE_ID')
  const publicKey = getEnv('VITE_EMAILJS_PUBLIC_KEY')

  // Initialize with public key (EmailJS v3)
  emailjs.init(publicKey)

  // Template variables are configured in EmailJS dashboard.
  // Map to common variable names; adjust if your template differs.
  return emailjs.send(serviceId, templateId, {
    project_type: payload.projectType,
    budget: payload.budget,
    timeline: payload.timeline,
    description: payload.description,
    reply_to: payload.replyTo,
    to_name: payload.to_name ?? 'House of Zuri',
    to_email: 'house.of.zuri26@gmail.com',
  })
}

