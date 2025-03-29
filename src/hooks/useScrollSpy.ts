import { useEffect } from "react"

interface PostScrollSpyOptions {
  onVisibilityChange?: (visibleIndexes: boolean[]) => void
}

const escapeID = (str: string) => {
  return str.replace(/^#(\d)/, '#\\3$1 ')
}

export const usePostScrollSpy = (options?: PostScrollSpyOptions) => {
  useEffect(() => {
    const cleanupFns: Array<() => void> = []

    // 앵커 하이퍼링크 설정
    const setupSmoothScroll = () => {
      const anchors = document.querySelectorAll('a[href^="#"]')
      const clickHandler = (e: Event) => {
        e.preventDefault()
        const anchor = e.currentTarget as HTMLAnchorElement
        const targetId = anchor.getAttribute('href')
        if (!targetId) return
        document.querySelector(escapeID(decodeURI(targetId)))?.scrollIntoView({
          behavior: 'smooth'
        })
      }
      anchors.forEach(anchor => {
        anchor.addEventListener('click', clickHandler)
      })
      cleanupFns.push(() => {
        anchors.forEach(anchor => {
          anchor.removeEventListener('click', clickHandler)
        })
      })
    }

    // Intersection Observer
    const setupIntersectionObserver = () =>  {
      const tocLinks = document.querySelectorAll('#toc-wrapper a:not(.anchor)')
      const headers = document.querySelectorAll('#post-wrapper h1[id],h2[id],h3[id]')
      const visibleBools: boolean[] = Array(headers.length).fill(false)

      if (tocLinks.length === headers.length && tocLinks.length > 0) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const idxAttr = entry.target.getAttribute('idx')
            const targetIdx = idxAttr !== null ? parseInt(idxAttr) : null
            if (targetIdx !== null && !isNaN(targetIdx)) {
              visibleBools[targetIdx] = entry.isIntersecting
            }
          })
          
          let anchorFlag = false
          tocLinks.forEach((link, i) => {
            if (visibleBools[i] && !anchorFlag) {
              link.classList.add('visible')
              anchorFlag = true
            } else {
              link.classList.remove('visible')
            }
          })

          options?.onVisibilityChange?.(visibleBools)
        }, {
          root: null,
          rootMargin: '-110px 0px 0px 0px'
        })

        headers.forEach((header, idx) => {
          header.setAttribute('idx', idx.toString())
          observer.observe(header)
        })
        cleanupFns.push(() => observer.disconnect())
      }
    }

    // 적용
    setupSmoothScroll()
    setupIntersectionObserver()

    // 언마운트 함수
    return () => {
      cleanupFns.forEach(cleanup => cleanup())
    }
  })
}