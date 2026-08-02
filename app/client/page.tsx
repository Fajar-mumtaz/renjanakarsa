'use client'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ClientPage(){
  const [daysLeft, setDaysLeft] = useState(0)
  const [client, setClient] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    if(!isSupabaseConfigured) { setLoading(false); return }
    fetchData()
  },[])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){ router.push('/login'); return }

    // ambil client berdasarkan email login
    const { data: c } = await supabase.from('clients').select('*').eq('email', user.email).single()
    if(c){
      setClient(c)
      if(c.tanggal_nikah){
        const target = new Date(c.tanggal_nikah)
        const diff = Math.ceil((target.getTime() - Date.now())/86400000)
        setDaysLeft(diff)
      }
      const { data: e } = await supabase.from('events').select('*, packages(nama_paket, harga)').eq('client_id', c.id).order('tanggal_event')
      if(e) setEvents(e)
    }
    setLoading(false)
  }

  if(loading) return <div className="min-h-screen bg-pink-50 p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-white/80 border-b p-4 flex justify-between">
        <h1 className="serif">Halo, {client?.nama_pasangan || 'Rina & Budi'}!</h1>
        <button onClick={async()=>{ await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-black text-white rounded- p-8">
          <div className="text-white/60 text-sm">Menuju Hari Bahagia</div>
          <div className="text-5xl serif mt-2">H-{daysLeft}</div>
          <div className="text-sm mt-2 text-white/60">{client?.tanggal_nikah? new Date(client.tanggal_nikah).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : 'Tanggal belum di-set'} • {events[0]?.lokasi || 'Gresik'}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-3">Paket & Acara</h2>
            {events.length===0? <p className="text-sm text-gray-400">Belum ada event. Pastikan kamu udah Run SQL insert events yang tadi.</p> : events.map((ev:any)=>(
              <div key={ev.id} className="py-3 border-b last:border-0">
                <div className="font-medium">{ev.packages?.nama_paket || 'Paket'} - Rp {ev.packages?.harga?.toLocaleString('id-ID')}</div>
                <div className="text-sm text-gray-500">{ev.tanggal_event} • {ev.lokasi} • {ev.status}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-3">Data Klien</h2>
            <div className="text-sm space-y-2">
              <div><span className="text-gray-400">Nama:</span> {client?.nama_pasangan}</div>
              <div><span className="text-gray-400">Email:</span> {client?.email}</div>
              <div><span className="text-gray-400">No HP:</span> {client?.no_hp}</div>
              <div><span className="text-gray-400">Alamat:</span> {client?.alamat || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
