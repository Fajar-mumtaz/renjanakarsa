'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ClientPage(){
  const [daysLeft, setDaysLeft] = useState(0)
  const router = useRouter()
  useEffect(()=>{
    const target = new Date('2026-08-15')
    const diff = Math.ceil((target.getTime()-Date.now())/86400000)
    setDaysLeft(diff)
  },[])

  return (
    <div className="min-h-screen bg-blush">
      <header className="bg-white/80 backdrop-blur border-b p-4 flex justify-between sticky top-0">
        <h1 className="serif">Halo, Rina & Budi! 🤍</h1>
        <button onClick={async()=>{await supabase.auth.signOut(); router.push('/login')}} className="text-sm border px-3 py-1 rounded-full">Logout</button>
      </header>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="bg-black text-white rounded-[24px] p-8 flex justify-between items-center">
          <div><div className="text-white/60 text-sm">Menuju Hari Bahagia</div><div className="text-5xl serif mt-2">H-{daysLeft}</div><div className="mt-2">15 Agustus 2026 • Gedung Wahana Ekspresi Gresik</div></div>
          <div className="text-right"><div className="text-sm">Progress</div><div className="text-3xl font-bold">60%</div><div className="w-32 h-2 bg-white/20 rounded-full mt-2"><div className="h-2 bg-gold rounded-full w-[60%]"></div></div></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6"><h3 className="font-semibold">Pembayaran</h3><div className="mt-4"><div className="flex justify-between text-sm"><span>Total Paket Gold</span><span className="font-bold">Rp 75.000.000</span></div><div className="w-full h-2 bg-gray-100 rounded-full mt-3"><div className="h-2 bg-green-500 rounded-full w-[50%]"></div></div><div className="mt-3 text-xs text-gray-500">Sudah bayar Rp 35jt • Sisa Rp 40jt</div></div></div>
          <div className="bg-white rounded-2xl p-6"><h3 className="font-semibold">Timeline</h3><ul className="mt-4 space-y-3 text-sm"><li>✅ Konsultasi Awal</li><li>✅ Booking & DP</li><li>🔄 Fitting Baju - 20 Juli</li><li>⏳ Technical Meeting - 10 Agustus</li><li>⏳ Hari H - 15 Agustus</li></ul></div>
        </div>
        <div className="bg-white rounded-2xl p-6"><h3 className="font-semibold">Vendor Kamu</h3><div className="grid grid-cols-2 gap-3 mt-4 text-sm"><div className="border rounded-xl p-3">📸 Lensacinta Photo<br/><span className="text-xs text-gray-500">Foto & Video</span></div><div className="border rounded-xl p-3">💄 MUA Lita<br/><span className="text-xs text-gray-500">MUA Premium</span></div></div></div>
      </div>
    </div>
  )
}
