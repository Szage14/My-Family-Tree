'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Lexend } from 'next/font/google'
import styles from './LoginPage.module.css'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

type FormErrors = {
  email?: string
  password?: string
  form?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: {
  email: string
  password: string
}): FormErrors {
  const nextErrors: FormErrors = {}

  if (!values.email.trim()) {
    nextErrors.email = 'Enter your email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    nextErrors.password = 'Enter your password.'
  } else if (values.password.length < 8) {
    nextErrors.password = 'Use at least 8 characters.'
  }

  return nextErrors
}

export default function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const rememberId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const visibleErrors = {
    email: touched.email ? errors.email : undefined,
    password: touched.password ? errors.password : undefined,
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validate({ email, password })
    setTouched({ email: true, password: true })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    setIsSubmitting(false)
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
                <p className={styles.brandSubtext}>
                  Family Tree Platform
                </p>
              </div>
            </div>

            <div className={styles.heroCopy}>
              <h1 className={styles.title}>Welcome back.</h1>
              <p className={styles.description}>
                Sign in to continue building, organizing, and exploring your
                family network with a workspace designed for clarity and speed.
              </p>

              <ul className={styles.featureList} aria-label="Login benefits">
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Secure sign-in backed by Supabase authentication.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Magic Link email verification and passwordless options.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Built for production-grade authentication and security.
                </li>
              </ul>
            </div>

            <div className={styles.trustRow} aria-label="Security highlights">
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Encrypted session-ready flow
              </span>
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Responsive across all screens
              </span>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <header className={styles.formHeader}>
                <h2 className={styles.formTitle}>Sign in to your account</h2>
                <p className={styles.formSubtitle}>
                  Use your email and password to access the dashboard.
                </p>
              </header>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor={emailId}>
                    Email address
                  </label>
                  <div className={styles.inputShell}>
                    <span className={styles.fieldIcon} aria-hidden="true">
                      <svg
                        className={styles.iconSvg}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
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
                            ...validate({ email: event.target.value, password }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, email: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({ email, password }),
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

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor={passwordId}>
                    Password
                  </label>
                  <div className={styles.inputShell}>
                    <span className={styles.fieldIcon} aria-hidden="true">
                      <svg
                        className={styles.iconSvg}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M7.5 10.5V8.75a4.5 4.5 0 1 1 9 0v1.75"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <rect
                          x="5"
                          y="10.5"
                          width="14"
                          height="9"
                          rx="2.4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                    <input
                      id={passwordId}
                      className={styles.input}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        if (touched.password) {
                          setErrors((current) => ({
                            ...current,
                            ...validate({ email, password: event.target.value }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, password: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({ email, password }),
                        }))
                      }}
                      aria-describedby={
                        visibleErrors.password ? `${passwordId}-error` : undefined
                      }
                    />
                    <button
                      className={styles.toggleButton}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {visibleErrors.password ? (
                    <p id={`${passwordId}-error`} className={styles.fieldError} role="alert">
                      {visibleErrors.password}
                    </p>
                  ) : null}
                </div>

                <div className={styles.metaRow}>
                  <label className={styles.rememberLabel} htmlFor={rememberId}>
                    <input
                      id={rememberId}
                      className={styles.checkbox}
                      type="checkbox"
                      disabled={isSubmitting}
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    Remember me
                  </label>

                  <Link className={styles.link} href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.buttonSpinner} aria-hidden="true" />
                      Signing you in
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>

                <p className={styles.footerNote}>
                  This login foundation is ready for future API connection,
                  role-based access, and multi-factor authentication.
                </p>

                <p className={styles.switchAuth}>
                  Don&apos;t have an account?{' '}
                  <Link className={styles.switchLink} href="/register">
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