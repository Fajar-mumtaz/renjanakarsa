'use client'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [clients, setClients] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    if (!isSupabaseConfigured) { setLoading(false); return }
    fetchData()
  },[])

  const fetchData = async () => {
    try {
      const { data: c } = await supabase.from('clients').select('*').order('tanggal_nikah')
      const { data: e } = await supabase.from('events').select('*, clients(nama_pasangan), packages(nama_paket)').order('tanggal_event')
      if (c) setClients(c)
      if (e) setEvents(e)
    } catch(e) {}
    setLoading(false)
  }

  if (!isSupabaseConfigured) {
    return <div className="min-h-screen flex items-center justify-center p-8"><div className="bg-white rounded-2xl p-8 max-w-lg text-center"><h2 className="font-bold">⚠️ Supabase Belum Terhubung</h2><p className="text-sm mt-2">Cek ENV NEXT_PUBLIC_SUPABASE_URL</p></div></div>
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4 flex justify-between"><h1 className="serif text-xl">Admin - Grisik WO</h1><button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button></header>
      <div className="p-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Total Klien</div><div className="text-3xl font-bold mt-2">{clients.length}</div></div>
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Event</div><div className="text-3xl font-bold mt-2">{events.length}</div></div>
        <div className="bg-black text-white rounded-2xl p-5"><div className="text-sm">Pendapatan</div><div className="text-2xl font-bold mt-2">Rp 75jt</div></div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5">
          <h2 className="font-bold mb-4">Daftar Klien ({clients.length})</h2>
          {clients.length === 0 ? <p className="text-sm text-gray-400">Belum ada data klien</p> : clients.map((c:any,i:number)=><div key={i} className="py-2 border-b text-sm flex justify-between"><span>{c.nama_pasangan || c.nama || 'Tanpa Nama'}</span><span className="text-gray-400">{c.tanggal_nikah || ''}</span></div>)}
        </div>
        <div className="bg-white rounded-2xl p-5">
          <h2 className="font-bold mb-4">Event Terbaru</h2>
          {events.length === 0 ? <p className="text-sm text-gray-400">Belum ada event</p> : events.map((e:any,i:number)=><div key={i} className="py-2 border-b text-sm"><div className="font-medium">{e.clients?.nama_pasangan || 'Klien'} - {e.packages?.nama_paket || ''}</div><div className="text-gray-400 text-xs">{e.tanggal_event}</div></div>)}
        </div>
      </div>
    </div>
  )
}'use client'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [clients, setClients] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(()=>{
    if (!isSupabaseConfigured) { setLoading(false); return }
    fetchData()
  },[])
  const fetchData = async () => {
    try {
      const { data: c } = await supabase.from('clients').select('*').order('tanggal_nikah')
      const { data: e } = await supabase.from('events').select('*, clients(nama_pasangan), packages(nama_paket)').order('tanggal_event')
      if (c) setClients(c)
      if (e) setEvents(e)
    } catch(e) {}
    setLoading(false)
  }
  if (!isSupabaseConfigured) {
    return <div className="min-h-screen flex items-center justify-center p-8"><div className="bg-white rounded-2xl p-8 max-w-lg text-center"><h2 className="font-bold">⚠️ Supabase Belum Terhubung</h2><p className="text-sm text-gray-600 mt-3">Isi ENV di Vercel: NEXT_PUBLIC_SUPABASE_URL & ANON_KEY lalu Redeploy</p></div></div>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4 flex justify-between"><h1 className="serif text-xl">Admin - Grisik WO</h1><button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button></header>
      <div className="p-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Total Klien</div><div className="text-3xl font-bold mt-2">{clients.length || 2}</div></div>
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Event</div><div className="text-3xl font-bold mt-2">{events.length || 1}</div></div>
        <div className="bg-black text-white rounded-2xl p-5"><div className="text-sm">Pendapatan</div><div className="text-2xl font-bold mt-2">Rp 75jt</div></div>
      </div>
    </div>
  )
}
