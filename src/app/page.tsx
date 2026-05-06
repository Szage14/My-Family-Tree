'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

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
      <main style={containerStyle}>
        <p style={cardStyle}>Loading your session...</p>
      </main>
    )
  }

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email || 'there'

  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>Authenticated</p>
        <h1 style={titleStyle}>Welcome, {displayName}.</h1>
        <p style={textStyle}>
          Your Supabase magic-link session is active. This protected landing page is where
          the callback now sends signed-in users.
        </p>

        <div style={buttonRowStyle}>
          <button type="button" onClick={handleSignOut} style={buttonStyle}>
            Sign out
          </button>
          <Link href="/login" style={secondaryLinkStyle}>
            Go to login
          </Link>
        </div>
      </section>
    </main>
  )
}

const containerStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '2rem',
  background:
    'radial-gradient(circle at top left, rgba(34, 211, 238, 0.22), transparent 34%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.2), transparent 30%), linear-gradient(135deg, #03111f 0%, #07182b 46%, #03111f 100%)',
  color: '#e2f3ff',
}

const cardStyle: CSSProperties = {
  width: 'min(760px, 100%)',
  padding: '2rem',
  borderRadius: '1.5rem',
  border: '1px solid rgba(125, 211, 252, 0.18)',
  background: 'rgba(4, 14, 28, 0.72)',
  boxShadow: '0 30px 80px rgba(2, 8, 20, 0.56)',
  backdropFilter: 'blur(22px)',
}

const eyebrowStyle: CSSProperties = {
  margin: 0,
  color: 'rgba(186, 230, 253, 0.78)',
  fontSize: '0.78rem',
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
}

const titleStyle: CSSProperties = {
  margin: '0.8rem 0 0',
  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
  lineHeight: 1,
  letterSpacing: '-0.05em',
}

const textStyle: CSSProperties = {
  margin: '1rem 0 0',
  color: 'rgba(226, 243, 255, 0.8)',
  lineHeight: 1.7,
  maxWidth: '48rem',
}

const buttonRowStyle: CSSProperties = {
  display: 'flex',
  gap: '0.9rem',
  flexWrap: 'wrap',
  marginTop: '1.5rem',
}

const buttonStyle: CSSProperties = {
  border: '0',
  borderRadius: '999px',
  padding: '0.85rem 1.25rem',
  background: 'linear-gradient(135deg, #22d3ee, #38bdf8)',
  color: '#03111f',
  fontWeight: 700,
  cursor: 'pointer',
}

const secondaryLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  padding: '0.85rem 1.25rem',
  border: '1px solid rgba(125, 211, 252, 0.24)',
  color: '#dffbff',
  textDecoration: 'none',
}
