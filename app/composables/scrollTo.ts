export const useScrollTo = () => {
  const toWorks = () => {
    if (import.meta.client) {
      const works = document.getElementById('works')
      if (works) {
        works.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const works = () => {
    const route = useRoute()
    const currentPath = route.path
    if (currentPath !== '/') {
      navigateTo('/').then(() => toWorks())
    } else {
      toWorks()
    }
  }

  const top = () => {
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return { works, top }
}

