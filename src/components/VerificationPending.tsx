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
  title?: string
  description?: string
}

export default function VerificationPending({
  email,
  title = 'Check your email.',
  description = 'We have sent you a magic link to complete this step.',
}: VerificationPendingProps) {
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
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>
              {description} <strong>{email}</strong>
            </p>

            <div className={styles.instructions}>
              <p>To continue:</p>
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
                  <span>Click the magic link to complete sign in</span>
                </li>
              </ol>
            </div>

            <div className={styles.tips}>
              <p className={styles.tipLabel}>Tip:</p>
              <ul className={styles.tipList}>
                <li>Check your spam or promotions folder if you don&apos;t see it</li>
                <li>The link will expire in 1 hour</li>
                <li>You&apos;ll be signed in immediately after clicking it</li>
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
