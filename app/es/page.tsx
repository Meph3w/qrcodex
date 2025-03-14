import QRCodeGenerator from "@/components/qr-code-generator"
import SEOContent from "@/components/seo-content"
import { translations } from "@/lib/translations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: translations.es.meta.title,
  description: translations.es.meta.description,
}

export default function SpanishPage() {
  const { qrGenerator, seoContent } = translations.es

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12" id="qr-generator">
        <QRCodeGenerator translations={qrGenerator} />
      </div>

      <SEOContent content={seoContent} />
    </div>
  )
}

