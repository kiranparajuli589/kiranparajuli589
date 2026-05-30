import { u as useHead } from './server.mjs';

const defaultImage = "https://kiranparajuli.com.np/letter_k.png";
const defaultUrl = "https://kiranparajuli.com.np";
const useSeo = (options) => {
  const {
    title,
    description,
    keywords = "",
    image = defaultImage,
    url = defaultUrl,
    type = "website",
    publishedTime,
    structuredData,
    customMeta = []
  } = options;
  const fullTitle = `${title} | Kiran Parajuli`;
  const commonMeta = [
    {
      name: "description",
      content: description
    },
    {
      name: "author",
      content: "Kiran Parajuli"
    },
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    },
    {
      name: "theme-color",
      content: "#0e62c0"
    }
  ];
  const keywordsMeta = keywords ? [
    {
      name: "keywords",
      content: keywords
    }
  ] : [];
  const ogMeta = [
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: image
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:type",
      content: type
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    {
      property: "og:site_name",
      content: "Kiran Parajuli"
    }
  ];
  const twitterMeta = [
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: image
    },
    {
      name: "twitter:creator",
      content: "@kiranparajuli589"
    },
    {
      name: "twitter:site",
      content: "@kiranparajuli589"
    }
  ];
  const articleMeta = type === "article" && publishedTime ? [
    {
      property: "article:published_time",
      content: publishedTime
    },
    {
      property: "article:author",
      content: "Kiran Parajuli"
    }
  ] : [];
  const allMeta = [
    ...commonMeta,
    ...keywordsMeta,
    ...ogMeta,
    ...twitterMeta,
    ...articleMeta,
    ...customMeta
  ];
  useHead({
    title: fullTitle,
    htmlAttrs: {
      lang: "en"
    },
    meta: allMeta,
    link: [
      {
        rel: "canonical",
        href: url
      }
    ]
  });
  if (structuredData) {
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            ...structuredData
          })
        }
      ]
    });
  }
};
const createPersonStructuredData = (data) => {
  return {
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    image: data.image,
    url: data.url,
    ...data.email && { email: data.email },
    ...data.telephone && { telephone: data.telephone },
    ...data.sameAs && {
      sameAs: data.sameAs.filter((item) => !!item)
    },
    ...data.address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: data.address.addressLocality,
        addressCountry: data.address.addressCountry,
        ...data.address.postalCode && {
          postalCode: data.address.postalCode
        }
      }
    },
    ...data.knowsAbout && { knowsAbout: data.knowsAbout }
  };
};
const createWebsiteStructuredData = (data) => {
  return {
    "@type": "WebSite",
    name: data.name,
    description: data.description,
    url: data.url,
    author: {
      "@type": "Person",
      name: "Kiran Parajuli"
    }
  };
};
const createCollectionPageStructuredData = (data) => {
  return {
    "@type": "CollectionPage",
    name: data.name,
    description: data.description,
    url: data.url,
    author: {
      "@type": "Person",
      name: "Kiran Parajuli",
      jobTitle: "Frontend & Full Stack Developer & QA Engineer"
    }
  };
};

export { createWebsiteStructuredData as a, createCollectionPageStructuredData as b, createPersonStructuredData as c, useSeo as u };
//# sourceMappingURL=useSeo--CXWwwl_.mjs.map
