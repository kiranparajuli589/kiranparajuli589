import hljs from 'highlight.js';
import HtmlMark from 'htmlmark';

const getAssetUrl = (name, category) => {
  if (category) {
    return `/${category}/${name}`;
  }
  return `/${name}`;
};
const htmlMark = () => {
  return new HtmlMark({
    indent: 2,
    frontMatter: true,
    highlight: (code, lang) => {
      if (lang) {
        try {
          return hljs.highlight(lang, code).value;
        } catch {
          return hljs.highlightAuto(code).value;
        }
      } else return hljs.highlightAuto(code).value;
    }
  });
};

export { getAssetUrl as g, htmlMark as h };
//# sourceMappingURL=utils-DjzuE-8B.mjs.map
