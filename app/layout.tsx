import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Sidebar } from '@/components/sidebar'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AgroStock - Gestión de Inventario Agrícola',
  description: 'Sistema profesional de gestión de insumos y herramientas agrícolas',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1A5C3A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.className} antialiased bg-background`}>
        <Sidebar />
        <main className="ml-60">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
