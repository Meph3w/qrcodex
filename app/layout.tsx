import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QR CodeX - Generate QR Codes Easily",
  description: "Create customizable QR codes for your business, personal use, or marketing campaigns",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QrzcRWcHKXn0OQ7vDsPXiR4W9yHdLj.png", // Add favicon
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}



import './globals.css'