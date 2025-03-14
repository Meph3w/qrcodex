"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
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

  // Get localized path
  const getLocalizedPath = (path: string, locale: string) => {
    if (locale === "en") return path
    return `/${locale}${path === "/" ? "" : path}`
  }

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-500">
            Powered by{" "}
            <Link
              href="https://www.blog.eidoc.com.br/"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ei, Doc!
            </Link>
          </div>

          <div className="flex gap-4 text-sm text-gray-500">
            <Link
              href={getLocalizedPath(basePath, "en")}
              className={`hover:text-primary ${currentLocale === "en" ? "text-primary" : ""}`}
            >
              English
            </Link>
            <Link
              href={getLocalizedPath(basePath, "pt")}
              className={`hover:text-primary ${currentLocale === "pt" ? "text-primary" : ""}`}
            >
              Português
            </Link>
            <Link
              href={getLocalizedPath(basePath, "es")}
              className={`hover:text-primary ${currentLocale === "es" ? "text-primary" : ""}`}
            >
              Español
            </Link>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Code by{" "}
            <Link href="https://ahoikapptn.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
              ahoikapptn
            </Link>
            , powered by{" "}
            <Link href="https://v0.dev/" className="hover:underline" target="_blank" rel="noopener noreferrer">
              v0.dev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

