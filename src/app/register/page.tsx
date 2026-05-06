import type { Metadata } from 'next'
import RegisterPage from '@/components/RegisterPage'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterRoute() {
  return <RegisterPage />
}