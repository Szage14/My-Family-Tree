'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'
import styles from './home.module.css'

type SessionUser = {
  email?: string | null
  user_metadata?: Record<string, unknown> | null
}

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    let active = true

    async function loadSession(): Promise<void> {
      const supabase = getSupabaseClient()
      const { data } = await supabase.auth.getUser()

      if (!active) return

      if (!data.user) {
        router.replace('/login')
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
      if (!active) return

      if (!session?.user) {
        router.replace('/login')
        return
      }

      setUser(session.user)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [router])

  async function handleSignOut(): Promise<void> {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.card}>Loading your session...</p>
      </main>
    )
  }

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email || 'there'

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Authenticated</p>
        <h1 className={styles.title}>Welcome, {displayName}.</h1>
        <p className={styles.text}>
          Your Supabase magic-link session is active. This protected landing page is where
          the callback now sends signed-in users.
        </p>

        <div className={styles.buttonRow}>
          <button type="button" onClick={handleSignOut} className={styles.button}>
            Sign out
          </button>
          <Link href="/login" className={styles.secondaryLink}>
            Go to login
          </Link>
        </div>
      </section>
    </main>
  )
}
