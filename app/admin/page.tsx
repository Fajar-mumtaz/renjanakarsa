'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [clients, setClients] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const router = useRouter()

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () => {
    const { data: c } = await supabase.from('clients').select('*').order('tanggal_nikah')
    const { data: e } = await supabase.from('events').select('*, clients(nama_pasangan), packages(nama_paket)').order('tanggal_event')
    if (c) setClients(c)
    if (e) setEvents(e)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4 flex justify-between">
        <h1 className="serif text-xl">Admin - Grisik WO</h1>
        <button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button>
      </header>
      <div className="p-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Total Klien</div><div className="text-3xl font-bold mt-2">{clients.length || 8}</div></div>
        <div className="bg-white rounded-2xl p-5"><div className="text-sm text-gray-500">Event Bulan Ini</div><div className="text-3xl font-bold mt-2">{events.length || 3}</div></div>
        <div className="bg-black text-white rounded-2xl p-5"><div className="text-sm">Pendapatan</div><div className="text-2xl font-bold mt-2">Rp {events.reduce((a,b)=>a+(b.total_biaya||0),0).toLocaleString('id-ID') || '275.000.000'}</div></div>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Event Mendatang (dari Supabase)</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-gray-400 text-left"><th>Pasangan</th><th>Tanggal</th><th>Paket</th><th>Total</th><th>Status Bayar</th></tr></thead>
            <tbody>
              {events.length ? events.map((ev:any)=><tr key={ev.id} className="border-t"><td className="py-3">{ev.clients?.nama_pasangan}</td><td>{ev.tanggal_event}</td><td>{ev.packages?.nama_paket}</td><td>Rp {ev.total_biaya?.toLocaleString('id-ID')}</td><td><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{ev.status_bayar}</span></td></tr>) : 
              <tr className="border-t"><td className="py-3">Rina & Budi</td><td>2026-08-15</td><td>Gold</td><td>Rp 75.000.000</td><td><span className="bg-yellow-100 px-2 py-1 rounded-full text-xs">DP</span></td></tr>}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4">Data dummy akan terganti otomatis setelah Supabase terkoneksi.</p>
        </div>
      </div>
    </div>
  )
}
