import hljs from 'highlight.js'
// @ts-ignore
import HtmlMark from 'htmlmark'

export const getAssetUrl = (name: string, category?: 'company' | 'projects' | 'tech'): string => {
  if (category) {
    return `/${category}/${name}`
  }
  return `/${name}`
}

export const readAssets = async () => {
  try {
    const response = await fetch('/blogs.json')
    if (!response.ok) {
      return []
    }
    const files = await response.json()
    const assets: any[] = []
    for (const file of files) {
      const response = await fetch(`/blogBase/${file}`)
      if (!response.ok) {
        continue
      }
      const content = await response.text()
      assets.push({ path: `/blogBase/${file}`, content, fileName: file })
    }
    return assets
  } catch (error) {
    console.error('Error fetching markdown content:', error)
    return []
  }
}

export const htmlMark = () => {
  return new HtmlMark({
    indent: 2,
    frontMatter: true,
    highlight: (code: string, lang: string) => {
      if (lang) {
        try {
          return hljs.highlight(lang, code).value
        } catch (error) {
          return hljs.highlightAuto(code).value
        }
      } else return hljs.highlightAuto(code).value
    }
  })
}

