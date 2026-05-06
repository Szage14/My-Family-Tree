'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Lexend } from 'next/font/google'
import styles from './RegisterPage.module.css'
import VerificationPending from './VerificationPending'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { savePendingProfile } from '@/lib/pendingProfile'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

type FormErrors = {
  fullName?: string
  email?: string
  form?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: { fullName: string; email: string }): FormErrors {
  const nextErrors: FormErrors = {}

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Enter your full name.'
  } else if (values.fullName.trim().length < 2) {
    nextErrors.fullName = 'Use at least 2 characters.'
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Enter your email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Enter a valid email address.'
  }

  return nextErrors
}

export default function RegisterPage() {
  const fullNameId = useId()
  const emailId = useId()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [touched, setTouched] = useState({ fullName: false, email: false })
  const [errors, setErrors] = useState<FormErrors>({})

  const visibleErrors = {
    fullName: touched.fullName ? errors.fullName : undefined,
    email: touched.email ? errors.email : undefined,
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validate({ fullName, email })
    setTouched({ fullName: true, email: true })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      savePendingProfile(fullName.trim(), email.trim())
      const supabase = getSupabaseClient()

      const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        setSubmittedEmail('')
        setVerificationSent(false)
        setErrors({ form: error.message })
        setIsSubmitting(false)
        return
      }

      setSubmittedEmail(email.trim())
      setVerificationSent(true)
    } catch {
      setErrors({ form: 'Unable to send verification email. Try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (verificationSent) {
    return (
      <VerificationPending
        email={submittedEmail}
        title="Check your email to finish creating your account."
        description="Supabase sent a magic link to verify your email and activate your account."
      />
    )
  }

  return (
    <main className={`${styles.shell} ${lexend.className}`}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />

      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.brandPanel}>
            <div className={styles.brandRow}>
              <div className={styles.brandMark} aria-hidden="true">
                FT
              </div>
              <div>
                <p className={styles.eyebrow}>Create Account</p>
                <p className={styles.brandSubtext}>Family Tree Platform</p>
              </div>
            </div>

            <div className={styles.heroCopy}>
              <h1 className={styles.title}>Build your account.</h1>
              <p className={styles.description}>
                Enter your name and email. We&apos;ll send a magic link so you can finish
                sign-up without creating a password.
              </p>

              <ul className={styles.featureList} aria-label="Registration benefits">
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  No password to remember.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Email verification handled by Supabase.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Your display name is saved after the link is clicked.
                </li>
              </ul>
            </div>

            <div className={styles.trustRow} aria-label="Security highlights">
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Magic-link signup
              </span>
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Supabase-managed auth
              </span>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <header className={styles.formHeader}>
                <h2 className={styles.formTitle}>Create your account</h2>
                <p className={styles.formSubtitle}>
                  Fill in your details to get started.
                </p>
              </header>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor={fullNameId}>
                    Full name
                  </label>
                  <div className={styles.inputShell}>
                    <span className={styles.fieldIcon} aria-hidden="true">
                      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M12 12.2A4.2 4.2 0 1 0 12 3.8a4.2 4.2 0 0 0 0 8.4Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M4.8 20a7.2 7.2 0 0 1 14.4 0"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <input
                      id={fullNameId}
                      className={styles.input}
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      disabled={isSubmitting}
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(event) => {
                        setFullName(event.target.value)
                        if (touched.fullName) {
                          setErrors((current) => ({
                            ...current,
                            ...validate({ fullName: event.target.value, email }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, fullName: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({ fullName, email }),
                        }))
                      }}
                      aria-describedby={visibleErrors.fullName ? `${fullNameId}-error` : undefined}
                    />
                  </div>
                  {visibleErrors.fullName ? (
                    <p id={`${fullNameId}-error`} className={styles.fieldError} role="alert">
                      {visibleErrors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor={emailId}>
                    Email address
                  </label>
                  <div className={styles.inputShell}>
                    <span className={styles.fieldIcon} aria-hidden="true">
                      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="m6.5 8 5.1 4.1a.7.7 0 0 0 .8 0L17.5 8"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      id={emailId}
                      className={styles.input}
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      disabled={isSubmitting}
                      placeholder="name@company.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (touched.email) {
                          setErrors((current) => ({
                            ...current,
                            ...validate({ fullName, email: event.target.value }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, email: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({ fullName, email }),
                        }))
                      }}
                      aria-describedby={visibleErrors.email ? `${emailId}-error` : undefined}
                    />
                  </div>
                  {visibleErrors.email ? (
                    <p id={`${emailId}-error`} className={styles.fieldError} role="alert">
                      {visibleErrors.email}
                    </p>
                  ) : null}
                </div>

                {errors.form ? (
                  <p className={styles.fieldError} role="alert">
                    {errors.form}
                  </p>
                ) : null}

                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className={styles.buttonSpinner} aria-hidden="true" />
                      Sending link
                    </>
                  ) : (
                    'Send magic link'
                  )}
                </button>

                <p className={styles.footerNote}>
                  Already have an account?{' '}
                  <Link className={styles.link} href="/login">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
