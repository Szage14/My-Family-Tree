'use client'

import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Lexend } from 'next/font/google'
import styles from './RegisterPage.module.css'
import VerificationPending from './VerificationPending'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

type FormErrors = {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}): FormErrors {
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

  if (!values.password) {
    nextErrors.password = 'Create a password.'
  } else if (values.password.length < 8) {
    nextErrors.password = 'Use at least 8 characters.'
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = 'Confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = 'Passwords do not match.'
  }

  return nextErrors
}

export default function RegisterPage() {
  const fullNameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const confirmPasswordId = useId()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const visibleErrors = {
    fullName: touched.fullName ? errors.fullName : undefined,
    email: touched.email ? errors.email : undefined,
    password: touched.password ? errors.password : undefined,
    confirmPassword: touched.confirmPassword ? errors.confirmPassword : undefined,
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validate({
      fullName,
      email,
      password,
      confirmPassword,
    })

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate API call to Supabase for account creation
    // Supabase will automatically send a Magic Link verification email
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    // On success, show verification confirmation screen
    setSubmittedEmail(email)
    setVerificationSent(true)
    setIsSubmitting(false)
  }

  // Show verification confirmation screen after successful submission
  if (verificationSent) {
    return <VerificationPending email={submittedEmail} />
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
                Create a secure profile backed by Supabase. After registration,
                you&apos;ll receive a verification link via email to complete your signup.
              </p>

              <ul className={styles.featureList} aria-label="Registration benefits">
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Secure account creation with email verification.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Magic Link verification for seamless account activation.
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  Production-grade authentication powered by Supabase.
                </li>
              </ul>
            </div>

            <div className={styles.trustRow} aria-label="Security highlights">
              <span className={styles.trustPill}>
                <span className={styles.trustDot} aria-hidden="true" />
                Strong password&ndash;ready structure
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
                            ...validate({
                              fullName: event.target.value,
                              email,
                              password,
                              confirmPassword,
                            }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, fullName: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({
                            fullName,
                            email,
                            password,
                            confirmPassword,
                          }),
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
                            ...validate({
                              fullName,
                              email: event.target.value,
                              password,
                              confirmPassword,
                            }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, email: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({
                            fullName,
                            email,
                            password,
                            confirmPassword,
                          }),
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
                      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        if (touched.password) {
                          setErrors((current) => ({
                            ...current,
                            ...validate({
                              fullName,
                              email,
                              password: event.target.value,
                              confirmPassword,
                            }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, password: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({
                            fullName,
                            email,
                            password,
                            confirmPassword,
                          }),
                        }))
                      }}
                      aria-describedby={visibleErrors.password ? `${passwordId}-error` : undefined}
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

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor={confirmPasswordId}>
                    Confirm password
                  </label>
                  <div className={styles.inputShell}>
                    <span className={styles.fieldIcon} aria-hidden="true">
                      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                      id={confirmPasswordId}
                      className={styles.input}
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        if (touched.confirmPassword) {
                          setErrors((current) => ({
                            ...current,
                            ...validate({
                              fullName,
                              email,
                              password,
                              confirmPassword: event.target.value,
                            }),
                          }))
                        }
                      }}
                      onBlur={() => {
                        setTouched((current) => ({ ...current, confirmPassword: true }))
                        setErrors((current) => ({
                          ...current,
                          ...validate({
                            fullName,
                            email,
                            password,
                            confirmPassword,
                          }),
                        }))
                      }}
                      aria-describedby={
                        visibleErrors.confirmPassword ? `${confirmPasswordId}-error` : undefined
                      }
                    />
                    <button
                      className={styles.toggleButton}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {visibleErrors.confirmPassword ? (
                    <p id={`${confirmPasswordId}-error`} className={styles.fieldError} role="alert">
                      {visibleErrors.confirmPassword}
                    </p>
                  ) : null}
                </div>

                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.buttonSpinner} aria-hidden="true" />
                      Creating account
                    </>
                  ) : (
                    'Register'
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