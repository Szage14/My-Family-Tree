'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'
import DashboardTree from '@/components/DashboardTree'
import styles from './home.module.css'

type SessionUser = {
  email?: string | null
  user_metadata?: Record<string, unknown> | null
}

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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
      <main className={styles.shell}>
        <section className={styles.loadingCard}>
          <p className={styles.loadingText}>Preparing your family dashboard...</p>
        </section>
      </main>
    )
  }

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email || 'there'

  return (
    <main className={styles.shell}>
      <div className={styles.gridOverlay} />
      <div className={styles.glowA} />
      <div className={styles.glowB} />

      <section className={styles.dashboardWrap}>
        <header className={styles.topBar}>
          <div>
            <p className={styles.eyebrow}>Family Tree Dashboard</p>
            <h1 className={styles.title}>Welcome back, {displayName}</h1>
            <p className={styles.text}>
              This protected dashboard visualizes a fictional family hierarchy and is structured
              for future real-data integration.
            </p>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={handleSignOut} className={styles.button}>
              Sign out
            </button>
            <Link href="/login" className={styles.secondaryLink}>
              Login page
            </Link>
          </div>
        </header>

        <section className={styles.toolbar}>
          <label className={styles.searchBlock}>
            <span className={styles.searchLabel}>Search family branch</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={styles.searchInput}
              placeholder="Try a name, city, relationship, or profession"
            />
          </label>

          <div className={styles.metricRow}>
            <article className={styles.metricCard}>
              <p>Tree style</p>
              <strong>Hierarchical Branching</strong>
            </article>
            <article className={styles.metricCard}>
              <p>Data mode</p>
              <strong>Fictional Placeholder</strong>
            </article>
            <article className={styles.metricCard}>
              <p>Integration state</p>
              <strong>UI-First Ready</strong>
            </article>
          </div>
        </section>

        <div className={styles.treePanel}>
          <DashboardTree searchQuery={searchQuery} />
        </div>
      </section>
    </main>
  )
}
