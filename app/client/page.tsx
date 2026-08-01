'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
export default function ClientPage(){
  const [daysLeft, setDaysLeft] = useState(0)
  const router = useRouter()
  useEffect(()=>{ const target = new Date('2026-08-15'); const diff = Math.ceil((target.getTime()-Date.now())/86400000); setDaysLeft(diff) },[])
  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-white/80 border-b p-4 flex justify-between"><h1 className="serif">Halo, Rina & Budi!</h1><button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button></header>
      <div className="p-6 max-w-5xl mx-auto"><div className="bg-black text-white rounded-[24px] p-8"><div className="text-white/60 text-sm">Menuju Hari Bahagia</div><div className="text-5xl serif mt-2">H-{daysLeft}</div></div></div>
    </div>
  )
}
