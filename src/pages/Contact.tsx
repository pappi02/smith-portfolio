import { useCallback, useMemo, useRef, useState } from 'react'

import { buildWhatsAppUrl, hasErrors, sanitizeContactFormValues, validateContactForm, validateField } from '@/utils/validation'
import type { ContactFormErrors, ContactFormValues } from '@/utils/validation'
import { sanitizeString } from '@/utils/sanitization'
import { MAX_DESCRIPTION_LENGTH, SUBMISSION_COOLDOWN_MS } from '@/utils/constants'

type TouchedFields = Omit<Record<keyof ContactFormValues, boolean>, 'honeypot'>

const initialForm: ContactFormValues = {
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  replyTo: '',
  phone: '+2547',
  honeypot: '',
}

const initialTouched: TouchedFields = {
  projectType: false,
  budget: false,
  timeline: false,
  description: false,
  replyTo: false,
  phone: false,
}

const fieldOrder: Array<keyof TouchedFields> = [
  'projectType',
  'budget',
  'timeline',
  'description',
  'phone',
  'replyTo',
]

export default function Contact() {
  const [form, setForm] = useState<ContactFormValues>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>(initialTouched)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null)

  const projectTypeRef = useRef<HTMLInputElement>(null)
  const budgetRef = useRef<HTMLInputElement>(null)
  const timelineRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const sanitizedForm = useMemo(() => sanitizeContactFormValues(form), [form])

  const canSubmit = useMemo(() => {
    if (isSubmitting) {
      return false
    }

    const result = validateContactForm(sanitizedForm)
    return !hasErrors(result)
  }, [isSubmitting, sanitizedForm])

  const focusFirstInvalidField = useCallback((fieldErrors: ContactFormErrors) => {
    for (const field of fieldOrder) {
      if (!fieldErrors[field]) {
        continue
      }

      const ref =
        field === 'projectType'
          ? projectTypeRef
          : field === 'budget'
          ? budgetRef
          : field === 'timeline'
          ? timelineRef
          : field === 'description'
          ? descriptionRef
          : field === 'phone'
          ? phoneRef
          : emailRef

      ref.current?.focus()
      break
    }
  }, [])

  const handleFieldChange = useCallback((field: keyof ContactFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }, [])

  const handleFieldBlur = useCallback(
    (field: keyof TouchedFields, value: string) => {
      const sanitizedValue = sanitizeContactFormValues({ ...form, [field]: value })[field]
      const error = validateField(field, sanitizedValue)

      setForm((current) => ({ ...current, [field]: sanitizedValue }))
      setErrors((current) => ({ ...current, [field]: error }))
      setTouched((current) => ({ ...current, [field]: true }))
    },
    [form],
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isSubmitting) {
        return
      }

      const sanitized = sanitizeContactFormValues(form)
      if (sanitized.honeypot.trim().length > 0) {
        return
      }

      const nextErrors = validateContactForm(sanitized)
      const nextTouched = fieldOrder.reduce((acc, field) => ({ ...acc, [field]: true }), {} as TouchedFields)
      setErrors(nextErrors)
      setTouched(nextTouched)

      if (hasErrors(nextErrors)) {
        focusFirstInvalidField(nextErrors)
        return
      }

      const now = Date.now()
      if (lastSubmitTime && now - lastSubmitTime < SUBMISSION_COOLDOWN_MS) {
        return
      }

      setIsSubmitting(true)
      setLastSubmitTime(now)

      const whatsappUrl = buildWhatsAppUrl(sanitized)
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

      if (!newWindow) {
        setIsSubmitting(false)
      }
    },
    [form, focusFirstInvalidField, isSubmitting, lastSubmitTime],
  )

  const renderError = useCallback(
    (field: keyof ContactFormValues) => {
      const message = errors[field]
      const isTouched = touched[field as keyof TouchedFields]
      if (!isTouched || !message) {
        return null
      }
      return (
        <p id={`${field}-error`} className="text-sm text-red-400">
          {message}
        </p>
      )
    },
    [errors, touched],
  )

  return (
    <div className="min-h-screen bg-black text-white px-6 py-24 md:px-12">
      <div className="max-w-4xl space-y-14">
        <section>
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Work With House of Zuri</p>
          <h1 className="mt-6 text-5xl font-serif">Let's Create Something Exceptional Together.</h1>
          <p className="mt-6 max-w-2xl text-base text-white/70">
            Fill in your project details below and submit. WhatsApp will open with your message ready to send to House of Zuri at +254769515127.
          </p>
        </section>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">House of Zuri Inquiry</p>
            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="projectType" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Project Type
                </label>
                <input
                  ref={projectTypeRef}
                  id="projectType"
                  name="projectType"
                  value={form.projectType}
                  onChange={(event) => handleFieldChange('projectType', event.target.value)}
                  onBlur={(event) => handleFieldBlur('projectType', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                  placeholder="Fashion Design / CLO 3D / Embroidery"
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  autoComplete="off"
                />
                {renderError('projectType')}
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Budget
                </label>
                <input
                  ref={budgetRef}
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={(event) => handleFieldChange('budget', event.target.value)}
                  onBlur={(event) => handleFieldBlur('budget', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                  placeholder="KSH 25,000 - 120,000"
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? 'budget-error' : undefined}
                  autoComplete="off"
                />
                {renderError('budget')}
              </div>

              <div className="space-y-2">
                <label htmlFor="timeline" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Timeline
                </label>
                <input
                  ref={timelineRef}
                  id="timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={(event) => handleFieldChange('timeline', event.target.value)}
                  onBlur={(event) => handleFieldBlur('timeline', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                  placeholder="2 weeks / 12 weeks"
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? 'timeline-error' : undefined}
                  autoComplete="off"
                />
                {renderError('timeline')}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={(event) => handleFieldChange('description', event.target.value)}
                  onBlur={(event) => handleFieldBlur('description', event.target.value)}
                  rows={6}
                  className="w-full rounded-[2rem] border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                  placeholder="Describe your fashion project and goals."
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'description-error' : 'description-counter'}
                  autoComplete="off"
                />
                {renderError('description')}
                <p id="description-counter" className="text-xs text-white/60">
                  {sanitizeString(form.description).length}/{MAX_DESCRIPTION_LENGTH}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Phone number
                </label>
                <input
                  ref={phoneRef}
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={(event) => handleFieldChange('phone', event.target.value)}
                  onBlur={(event) => handleFieldBlur('phone', event.target.value)}
                  type="tel"
                  inputMode="tel"
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                  placeholder="(+254)7XXXXXXXX OR 1XXXXXXXX"
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                />
                {renderError('phone')}
              </div>

              <div className="space-y-2">
                <label htmlFor="replyTo" className="block text-xs uppercase tracking-[0.32em] text-white/60">
                  Your Email
                </label>
                <input
                  ref={emailRef}
                  id="replyTo"
                  name="replyTo"
                  value={form.replyTo}
                  onChange={(event) => handleFieldChange('replyTo', event.target.value)}
                  onBlur={(event) => handleFieldBlur('replyTo', event.target.value)}
                  type="email"
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.replyTo)}
                  aria-describedby={errors.replyTo ? 'replyTo-error' : undefined}
                  autoComplete="email"
                />
                {renderError('replyTo')}
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: 'auto',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <label htmlFor="website">Leave this field blank</label>
                <input
                  id="website"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={(event) => handleFieldChange('honeypot', event.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Contact</p>
            <h2 className="mt-4 text-3xl font-serif">Let's collaborate</h2>
          </div>
          <div className="space-y-4 text-sm text-white/70">
            <p><strong>Email:</strong> house.of.zuri26@gmail.com</p>
            <p><strong>Phone:</strong> +254 769 515 127</p>
            <p><strong>Location:</strong> Nairobi, Kenya</p>
          </div>
          <div className="rounded-[2rem] bg-black/40 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Available For</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>Custom fashion design</li>
              <li>Pattern drafting</li>
              <li>CLO 3D visualization</li>
              <li>Embroidery planning</li>
              <li>Textile print design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
