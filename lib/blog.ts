import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define o diretório onde os posts do blog serão armazenados
const contentDirectory = path.join(process.cwd(), "content/blog")

// Função para obter todos os posts de um determinado idioma
export function getAllPosts(locale = "en") {
  const postsDirectory = path.join(contentDirectory, locale)

  // Verifica se o diretório existe
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        ...data,
      }
    })

  // Ordena os posts por data, do mais recente para o mais antigo
  return posts.sort((a, b) => {
    const dateA = new Date(a.date as string)
    const dateB = new Date(b.date as string)
    return dateB.getTime() - dateA.getTime()
  })
}

// Função para obter um post específico pelo slug
export async function getPostBySlug(slug: string, locale = "en") {
  try {
    const filePath = path.join(contentDirectory, locale, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)

    const contentHtml = processedContent.toString()

    return {
      slug,
      ...data,
      content: contentHtml,
    }
  } catch (error) {
    return null
  }
}

