import { sanitizeEmail, sanitizeString } from '@/utils/sanitization'
import {
  MAX_BUDGET_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PROJECT_TYPE_LENGTH,
  MAX_TIMELINE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_PROJECT_TYPE_LENGTH,
  WHATSAPP_BASE_URL,
  WHATSAPP_TARGET_NUMBER,
} from '@/utils/constants'

export type ContactFormValues = {
  projectType: string
  budget: string
  timeline: string
  description: string
  replyTo: string
  phone: string
  honeypot: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizePhone(value: string): string | null {
  const cleaned = value.replace(/[\s-()]+/g, '')
  const digitsOnly = cleaned.replace(/^\+/, '')

  if (/^2547\d{8}$/.test(digitsOnly)) {
    return `+${digitsOnly}`
  }

  if (/^07\d{8}$/.test(digitsOnly)) {
    return `+254${digitsOnly.slice(1)}`
  }

  if (/^01\d{8}$/.test(digitsOnly)) {
    return `+254${digitsOnly.slice(1)}`
  }

  if (/^\+2547\d{8}$/.test(cleaned)) {
    return cleaned
  }

  return null
}

export function sanitizeContactFormValues(values: ContactFormValues): ContactFormValues {
  return {
    projectType: sanitizeString(values.projectType),
    budget: sanitizeString(values.budget),
    timeline: sanitizeString(values.timeline),
    description: sanitizeString(values.description),
    replyTo: sanitizeEmail(values.replyTo),
    phone: sanitizeString(values.phone),
    honeypot: sanitizeString(values.honeypot),
  }
}

export function validateProjectType(value: string) {
  if (!value) {
    return 'Project type is required.'
  }

  if (value.length < MIN_PROJECT_TYPE_LENGTH) {
    return `Project type must be at least ${MIN_PROJECT_TYPE_LENGTH} characters.`
  }

  if (value.length > MAX_PROJECT_TYPE_LENGTH) {
    return `Project type cannot exceed ${MAX_PROJECT_TYPE_LENGTH} characters.`
  }

  return undefined
}

export function validateBudget(value: string) {
  if (!value) {
    return 'Budget is required.'
  }

  if (value.length > MAX_BUDGET_LENGTH) {
    return `Budget cannot exceed ${MAX_BUDGET_LENGTH} characters.`
  }

  return undefined
}

export function validateTimeline(value: string) {
  if (!value) {
    return 'Timeline is required.'
  }

  if (value.length > MAX_TIMELINE_LENGTH) {
    return `Timeline cannot exceed ${MAX_TIMELINE_LENGTH} characters.`
  }

  return undefined
}

export function validateDescription(value: string) {
  if (!value) {
    return 'Description is required.'
  }

  if (value.length < MIN_DESCRIPTION_LENGTH) {
    return `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`
  }

  if (value.length > MAX_DESCRIPTION_LENGTH) {
    return `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`
  }

  const charactersOnly = value.replace(/\s+/g, '')
  if (charactersOnly.length > 0 && new Set(charactersOnly).size === 1) {
    return 'Description must contain more detail than repeated characters.'
  }

  return undefined
}

export function validateEmail(value: string) {
  if (!value) {
    return 'Email is required.'
  }

  if (value.length > MAX_EMAIL_LENGTH) {
    return `Email cannot exceed ${MAX_EMAIL_LENGTH} characters.`
  }

  if (!EMAIL_REGEX.test(value)) {
    return 'Enter a valid email address.'
  }

  return undefined
}

export function validatePhone(value: string) {
  if (!value) {
    return 'Phone number is required.'
  }

  if (!normalizePhone(value)) {
    return 'Enter a valid Kenyan phone number.'
  }

  return undefined
}

export function validateField(field: keyof Omit<ContactFormValues, 'honeypot'>, value: string) {
  switch (field) {
    case 'projectType':
      return validateProjectType(value)
    case 'budget':
      return validateBudget(value)
    case 'timeline':
      return validateTimeline(value)
    case 'description':
      return validateDescription(value)
    case 'replyTo':
      return validateEmail(value)
    case 'phone':
      return validatePhone(value)
    default:
      return undefined
  }
}

export function validateContactForm(values: ContactFormValues) {
  return {
    projectType: validateProjectType(values.projectType),
    budget: validateBudget(values.budget),
    timeline: validateTimeline(values.timeline),
    description: validateDescription(values.description),
    replyTo: validateEmail(values.replyTo),
    phone: validatePhone(values.phone),
  }
}

export function hasErrors(errors: ContactFormErrors) {
  return Object.values(errors).some(Boolean)
}

export function buildWhatsAppUrl(values: ContactFormValues) {
  const normalizedPhone = normalizePhone(values.phone)
  const lines = [
    'Hello House of Zuri,',
    `Project Type: ${values.projectType}`,
    `Budget: ${values.budget}`,
    `Timeline: ${values.timeline}`,
    `Phone: ${normalizedPhone ?? values.phone}`,
    `Email: ${values.replyTo}`,
    `Description: ${values.description}`,
  ]

  const encoded = lines.map(encodeURIComponent).join('%0A')
  return `${WHATSAPP_BASE_URL}/${WHATSAPP_TARGET_NUMBER}?text=${encoded}`
}
