'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const login = async (e: any, demoEmail?: string, demoPass?: string) => {
    e.preventDefault()
    setLoading(true)
    const eMail = demoEmail || email
    const ePass = demoPass || password
    const { data, error } = await supabase.auth.signInWithPassword({ email: eMail, password: ePass })
    if (error) { setMsg(error.message); setLoading(false); return }
    const role = data.user?.user_metadata?.role || (eMail.includes('admin') ? 'admin' : 'client')
    setMsg('Login berhasil!')
    router.push(role === 'admin' ? '/admin' : '/client')
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex bg-black relative">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="relative z-10 p-12 flex flex-col justify-end text-white">
          <h1 className="serif text-5xl leading-tight">Grisik Wedding Organizer</h1>
          <p className="mt-4 text-white/80">Kelola pernikahan impian dari Gresik untuk Indonesia. Profesional, transparan, penuh cinta.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="serif text-3xl">Masuk ke Akun</h2>
          <p className="text-sm text-gray-500 mt-2">Sistem Informasi Pengelolaan WO</p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={(e)=>login(e,'admin@grisikwo.com','admin123')} className="border rounded-xl p-3 text-left hover:bg-gray-50">
              <div className="font-semibold text-sm">Demo Admin</div><div className="text-xs text-gray-500">admin@grisikwo.com</div>
            </button>
            <button onClick={(e)=>login(e,'rina.budi@gmail.com','klien123')} className="border rounded-xl p-3 text-left hover:bg-blush">
              <div className="font-semibold text-sm">Demo Klien</div><div className="text-xs text-gray-500">rina.budi@gmail.com</div>
            </button>
          </div>

          <form onSubmit={login} className="mt-8 space-y-4">
            <div><label className="text-sm">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 border rounded-xl px-4 py-3" placeholder="email@..." /></div>
            <div><label className="text-sm">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 border rounded-xl px-4 py-3" placeholder="******" /></div>
            {msg && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{msg}</div>}
            <button disabled={loading} className="w-full bg-black text-white rounded-xl py-3 font-semibold hover:bg-gray-900">{loading ? 'Memproses...' : 'Masuk'}</button>
          </form>
          <p className="text-xs text-gray-400 mt-6 text-center">Setup Supabase dulu ya kak, lihat PANDUAN_SETUP.md</p>
        </div>
      </div>
    </div>
  )
}
