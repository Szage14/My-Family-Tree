'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Lexend } from 'next/font/google'
import styles from './LoginPage.module.css'
import VerificationPending from './VerificationPending'
import { getSupabaseClient } from '@/lib/supabaseClient'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

type FormErrors = {
  email?: string
  form?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: { email: string }): FormErrors {
  const nextErrors: FormErrors = {}

  if (!values.email.trim()) {
    nextErrors.email = 'Enter your email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Enter a valid email address.'
  }

  return nextErrors
}

export default function LoginPage() {
  const emailId = useId()

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [touched, setTouched] = useState({ email: false })
  const [errors, setErrors] = useState<FormErrors>({})

  const visibleErrors = {
    email: touched.email ? errors.email : undefined,
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validate({ email })
    setTouched({ email: true })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const supabase = getSupabaseClient()
      const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: false,
        },
      })

      if (error) {
        setErrors({ form: error.message })
        setIsSubmitting(false)
        return
      }

      setSubmittedEmail(email.trim())
      setLinkSent(true)
    } catch {
      setErrors({ form: 'Unable to send magic link. Try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (linkSent) {
    return (
      <VerificationPending
        email={submittedEmail}
        title="Check your email to sign in."
        description="Supabase sent a magic link to your inbox. Click it to finish signing in."
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
                <p className={styles.eyebrow}>Secure Access</p>
                <p className={styles.brandSubtext}>Family Tree Platform</p>
              </div>
            </div>

            <div className={styles.heroCopy}>
              <h1 className={styles.title}>Welcome back.</h1>
              <p className={styles.description}>
                Enter your email and we&apos;ll send you a one-time magic link. No password
                needed.
              </p>

              <ul className={styles.featureList} aria-label="Login benefits">
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Passwordless sign-in with Supabase.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  The link creates your session automatically.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Works with the same Supabase account you registered with.
                </li>
              </ul>
            </div>

            <div className={styles.trustRow} aria-label="Security highlights">
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Magic-link login
              </span>
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                No password required
              </span>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <header className={styles.formHeader}>
                <h2 className={styles.formTitle}>Sign in to your account</h2>
                <p className={styles.formSubtitle}>
                  Enter your email to receive a sign-in link.
                </p>
              </header>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                            ...validate({ email: event.target.value }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, email: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({ email }),
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
                  Don&apos;t have an account?{' '}
                  <Link className={styles.link} href="/register">
                    Register
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
