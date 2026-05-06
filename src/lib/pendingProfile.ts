const PENDING_FULL_NAME_KEY = 'family-tree-pending-full-name'
const PENDING_EMAIL_KEY = 'family-tree-pending-email'

export function savePendingProfile(fullName: string, email: string): void {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(PENDING_FULL_NAME_KEY, fullName)
  window.localStorage.setItem(PENDING_EMAIL_KEY, email)
}

export function loadPendingProfile(): { fullName: string; email: string } | null {
  if (typeof window === 'undefined') return null

  const fullName = window.localStorage.getItem(PENDING_FULL_NAME_KEY)
  const email = window.localStorage.getItem(PENDING_EMAIL_KEY)

  if (!fullName || !email) {
    return null
  }

  return { fullName, email }
}

export function clearPendingProfile(): void {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(PENDING_FULL_NAME_KEY)
  window.localStorage.removeItem(PENDING_EMAIL_KEY)
}
