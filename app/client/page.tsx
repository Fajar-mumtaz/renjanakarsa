'use client'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ClientPage(){
  const [daysLeft, setDaysLeft] = useState(13)
  const [client, setClient] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const router = useRouter()

  useEffect(()=>{
    if(!isSupabaseConfigured) return
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if(!user) return
      const { data: c } = await supabase.from('clients').select('*').eq('email', user.email).single()
      if(c){
        setClient(c)
        const target = new Date(c.tanggal_nikah)
        setDaysLeft(Math.ceil((target.getTime()-Date.now())/86400000))
        const { data: ev } = await supabase.from('events').select('*, packages(nama_paket, harga)').eq('client_id', c.id)
        if(ev) setEvents(ev)
      }
    }
    fetchData(); // <-- ini yang ketinggalan
  },[])

  return (
    <div className="min-h-screen bg-[#fdf2f5]">
      <header className="bg-white border-b p-4 flex justify-between">
        <h1 className="font-bold">Halo, {client?.nama_pasangan || 'Rina & Budi'}!</h1>
        <button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button>
      </header>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-black text-white rounded- p-8">
          <div className="text-white/60 text-sm">Menuju Hari Bahagia</div>
          <div className="text-5xl font-bold mt-2">H-{daysLeft}</div>
          <div className="text-sm mt-2 text-white/60">{client?.tanggal_nikah?.slice(0,10) || '2026-08-15'} • {events[0]?.lokasi || 'Gresik'}</div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-3">Detail Acara</h2>
            {events.length===0? <p className="text-sm text-gray-400">Belum ada event, tapi grid udah muncul.</p> : events.map((ev:any)=><div key={ev.id} className="py-2 border-b text-sm">{ev.packages?.nama_paket} - Rp {ev.packages?.harga?.toLocaleString()}<br/><span className="text-gray-500">{ev.tanggal_event} • {ev.lokasi}</span></div>)}
          </div>
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-3">Data Klien</h2>
            <div className="text-sm">Email: {client?.email || '-'}<br/>HP: {client?.no_hp || '-'}<br/>Tgl Nikah: {client?.tanggal_nikah || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
