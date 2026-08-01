import './globals.css'
export const metadata = { title: 'Grisik Wedding Organizer', description: 'Sistem Informasi WO Gresik' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@600&display=swap" rel="stylesheet" /></head>
      <body>{children}</body>
    </html>
  )
}
