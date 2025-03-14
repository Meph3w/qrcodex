import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, QrCode } from "lucide-react"
import { getPostBySlug } from "@/lib/blog"
import type { Metadata } from "next"

// Gera os metadados da página dinamicamente
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, "es")

  if (!post) {
    return {
      title: "Publicación No Encontrada",
    }
  }

  return {
    title: `${post.title} | QR CodeX Blog`,
    description: post.excerpt as string,
  }
}

export default async function BlogPostPageES({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, "es")

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/es/blog">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Blog
          </Link>
        </Button>

        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">
            {new Date(post.date as string).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content as string }} />

          {/* Botão de CTA ao final do post */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <Link href="/es/#qr-generator">
              <Button size="lg" className="w-full py-6 text-lg">
                <QrCode className="mr-2 h-5 w-5" />
                Crea tu Código QR gratis ahora
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

