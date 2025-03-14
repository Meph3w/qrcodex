import QRCodeGenerator from "@/components/qr-code-generator"
import SEOContent from "@/components/seo-content"
import { translations } from "@/lib/translations"

export default function HomePage() {
  const { qrGenerator, seoContent } = translations.en

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12" id="qr-generator">
        <QRCodeGenerator translations={qrGenerator} />
      </div>

      <SEOContent content={seoContent} />
    </div>
  )
}

