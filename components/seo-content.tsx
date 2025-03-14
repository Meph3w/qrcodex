interface Section {
  title: string
  content: string
}

interface SEOContentProps {
  content: {
    title: string
    intro: string
    sections: Section[]
    conclusion: string
  }
}

export default function SEOContent({ content }: SEOContentProps) {
  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
      <p className="text-lg mb-8 text-gray-700">{content.intro}</p>

      {content.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <p className="text-gray-700">{section.content}</p>
        </section>
      ))}

      <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-gray-800">{content.conclusion}</p>
      </div>
    </article>
  )
}

