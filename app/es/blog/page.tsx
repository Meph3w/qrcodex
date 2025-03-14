import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: `${translations.es.blog.title} | QR CodeX`,
  description: translations.es.blog.description,
}

export default function BlogPageES() {
  const { blog } = translations.es

  // Obter posts do blog em espanhol
  const posts = getAllPosts("es")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <p className="text-lg mb-8 text-gray-700">{blog.description}</p>

        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={`/es/blog/${post.slug}`}>{blog.readMore}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{blog.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  )
}

