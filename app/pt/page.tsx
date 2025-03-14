import QRCodeGenerator from "@/components/qr-code-generator"
import SEOContent from "@/components/seo-content"
import { translations } from "@/lib/translations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: translations.pt.meta.title,
  description: translations.pt.meta.description,
}

export default function PortuguesePage() {
  const { qrGenerator, seoContent } = translations.pt

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12" id="qr-generator">
        <QRCodeGenerator translations={qrGenerator} />
      </div>

      <SEOContent content={seoContent} />
    </div>
  )
}

