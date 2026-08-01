'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/login')
      else {
        const role = data.session.user.user_metadata?.role || 'client'
        router.push(role === 'admin' ? '/admin' : '/client')
      }
    })
  }, [])
  return <div className="min-h-screen flex items-center justify-center">Loading Grisik WO...</div>
}
