'use client'

import Link from 'next/link'
import { Lexend } from 'next/font/google'
import styles from './VerificationPending.module.css'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

interface VerificationPendingProps {
  email: string
}

export default function VerificationPending({ email }: VerificationPendingProps) {
  return (
    <main className={`${styles.shell} ${lexend.className}`}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />

      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.illustration} aria-hidden="true">
            <svg className={styles.mailIcon} viewBox="0 0 80 80" fill="none">
              <rect
                x="10"
                y="20"
                width="60"
                height="40"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10 25L40 45L70 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>Check your email.</h1>
            <p className={styles.subtitle}>
              We&apos;ve sent a verification link to <strong>{email}</strong>
            </p>

            <div className={styles.instructions}>
              <p>To complete your registration:</p>
              <ol className={styles.stepList}>
                <li>
                  <span className={styles.stepNumber}>1</span>
                  <span>Open your email inbox</span>
                </li>
                <li>
                  <span className={styles.stepNumber}>2</span>
                  <span>Look for a message from Family Tree App</span>
                </li>
                <li>
                  <span className={styles.stepNumber}>3</span>
                  <span>Click the verification link to activate your account</span>
                </li>
              </ol>
            </div>

            <div className={styles.tips}>
              <p className={styles.tipLabel}>Tip:</p>
              <ul className={styles.tipList}>
                <li>Check your spam or promotions folder if you don&apos;t see it</li>
                <li>The link will expire in 24 hours</li>
                <li>You&apos;ll be able to log in immediately after verification</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <p className={styles.actionNote}>
                Already verified?{' '}
                <Link className={styles.actionLink} href="/login">
                  Return to login
                </Link>
              </p>
            </div>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Verification link not working? Contact support or request a new link.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
