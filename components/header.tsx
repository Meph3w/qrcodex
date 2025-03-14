"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  // Determine current locale and paths
  let currentLocale = "en"
  let basePath = pathname

  if (pathname.startsWith("/pt")) {
    currentLocale = "pt"
    basePath = pathname.substring(3) || "/"
  } else if (pathname.startsWith("/es")) {
    currentLocale = "es"
    basePath = pathname.substring(3) || "/"
  }

  // Translations for navigation
  const translations = {
    en: {
      blog: "Blog",
      createQR: "Create QR Code",
    },
    pt: {
      blog: "Blog",
      createQR: "Criar QR Code",
    },
    es: {
      blog: "Blog",
      createQR: "Crear Código QR",
    },
  }

  const t = translations[currentLocale as keyof typeof translations]

  // Get localized path
  const getLocalizedPath = (path: string, locale: string) => {
    if (locale === "en") return path
    return `/${locale}${path === "/" ? "" : path}`
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={getLocalizedPath("/", currentLocale)} className="text-2xl font-bold">
          QR CodeX
        </Link>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={getLocalizedPath(basePath, "en")}>English</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={getLocalizedPath(basePath, "pt")}>Português</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={getLocalizedPath(basePath, "es")}>Español</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={getLocalizedPath("/blog", currentLocale)}>
            <Button variant="ghost">{t.blog}</Button>
          </Link>

          <Link href={`${getLocalizedPath("/", currentLocale)}#qr-generator`}>
            <Button variant="default">{t.createQR}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

