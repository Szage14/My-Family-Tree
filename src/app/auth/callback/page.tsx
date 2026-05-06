'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { clearPendingProfile, loadPendingProfile } from '@/lib/pendingProfile'
import styles from './auth-callback.module.css'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Completing sign-in...')

  useEffect(() => {
    let active = true

    async function finishAuth(): Promise<void> {
      try {
        const supabase = getSupabaseClient()
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const result = code
          ? await supabase.auth.exchangeCodeForSession(code)
          : await supabase.auth.getSession()

        const error = result.error

        if (error) {
          setStatus('Sign-in failed')
          router.replace(`/login?error=${encodeURIComponent(error.message)}`)
          return
        }

        const profile = loadPendingProfile()

        if (profile) {
          const { error: updateError } = await supabase.auth.updateUser({
            data: { full_name: profile.fullName },
          })

          if (!updateError) {
            clearPendingProfile()
          }
        }

        if (active) {
          router.replace('/')
        }
      } catch {
        setStatus('Sign-in error')
        router.replace('/login')
      }
    }

    finishAuth()

    return () => {
      active = false
    }
  }, [router])

  return (
    <main className={styles.container}>
      <p>{status}</p>
    </main>
  )
}
