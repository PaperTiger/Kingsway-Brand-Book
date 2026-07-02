import { lazy, Suspense, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import PageNav from './components/PageNav'
import brand from './brand.config'

const SECTIONS: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  home:                 lazy(() => import('./sections/home/Cover')),
  'vi-intro':           lazy(() => import('./sections/home/ViIntro')),
  'logo-main-wordmark': lazy(() => import('./sections/logo/MainWordmark')),
  'logo-horizontal':    lazy(() => import('./sections/logo/FullLogo')),
  'logo-stacked':       lazy(() => import('./sections/logo/StackedLogo')),
  'h-logo-mark':        lazy(() => import('./sections/logo/LogoMark')),
  'logo-avatar':        lazy(() => import('./sections/logo/LogoAvatar')),
  'logo-avoid':         lazy(() => import('./sections/logo/LogoAvoid')),
  'color-intro':        lazy(() => import('./sections/color/ColorIntro')),
  'primary-palette':    lazy(() => import('./sections/color/PrimaryPalette')),
  'secondary-palette':  lazy(() => import('./sections/color/SecondaryPalette')),
  'color-combinations': lazy(() => import('./sections/color/ColorCombinations')),
  'color-pathways':     lazy(() => import('./sections/color/ColorPathways')),
  'type-intro':         lazy(() => import('./sections/typography/TypeIntro')),
  'fg-overview':        lazy(() => import('./sections/typography/TypeOverview')),
  'fg-usage':           lazy(() => import('./sections/typography/TypeUsage')),
  'fg-specimen':        lazy(() => import('./sections/typography/TypeSpecimen')),
  'fg-scale':           lazy(() => import('./sections/typography/TypeScale')),
  'google-fallback':    lazy(() => import('./sections/typography/GoogleFallback')),
  'type-fallback':      lazy(() => import('./sections/typography/SystemFallback')),
  'type-avoid':         lazy(() => import('./sections/typography/TypeAvoid')),
  'photo-intro':        lazy(() => import('./sections/photography/PhotoIntro')),
  'photo-examples':     lazy(() => import('./sections/photography/PhotoExamples')),
  'photo-dos':          lazy(() => import('./sections/photography/PhotoDos')),
  'photo-donts':        lazy(() => import('./sections/photography/PhotoDonts')),
  'logo-cobranding':    lazy(() => import('./sections/logo/Cobranding')),
  'dataviz-colors':     lazy(() => import('./sections/dataviz/DataVizColors')),
  'dataviz-charts':     lazy(() => import('./sections/dataviz/DataVizCharts')),
  'app-intro':          lazy(() => import('./sections/applications/AppIntro')),
  'app-examples':       lazy(() => import('./sections/applications/AppExamples')),
  'icon-intro':         lazy(() => import('./sections/iconography/IconIntro')),
  'print-specs':        lazy(() => import('./sections/print/PrintSpecs')),
}

function hexLuminance(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const lin = (x: number) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function useBrandTokens() {
  useEffect(() => {
    const tokenDecls = Object.entries(brand.tokens).map(([k, v]) => `--${k}: ${v}`).join('; ')

    const primarySorted = [...brand.colors.primary].sort((a, b) => hexLuminance(a.hex) - hexLuminance(b.hex))
    const darkest = primarySorted[0]
    const overviewDecls = `--fg-overview-bg: ${darkest.hex}; --fg-overview-text: ${brand.tokens['pale-blue']}`

    // RGB triplets for tokens used in rgba() in index.css
    const rgbDecls = Object.entries(brand.tokens).map(([k, v]) => {
      const c = v.replace('#', '')
      const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16)
      return `--${k}-rgb: ${r}, ${g}, ${b}`
    }).join('; ')

    const style = document.createElement('style')
    style.textContent = `:root { ${tokenDecls}; ${rgbDecls}; ${overviewDecls} }`
    document.head.appendChild(style)
    document.title = `${brand.meta.nameLine1}${brand.meta.nameLine2 ? ' ' + brand.meta.nameLine2 : ''}, Brand Identity`
    return () => { document.head.removeChild(style) }
  }, [])
}

function MobileHeader({ onOpen, onHome }: { onOpen: () => void; onHome: () => void }) {
  const [logoError, setLogoError] = useState(false)
  const hasLogo = !!brand.meta.sidebarLogoImage
  return (
    <header className="mobile-header">
      <button className="hamburger" onClick={onOpen} aria-label="Open menu">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="var(--black)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        {hasLogo && !logoError && (
          <img
            src={brand.meta.sidebarLogoImage}
            alt={brand.meta.client}
            style={{ height: 20, width: 'auto', display: 'block' }}
            onError={() => setLogoError(true)}
          />
        )}
        {(!hasLogo || logoError) && (
          <span style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 14,
            letterSpacing: '-0.02em', color: 'var(--black)' }}>
            {brand.meta.nameLine1}{brand.meta.nameLine2 ? ' ' + brand.meta.nameLine2 : ''}
          </span>
        )}
      </div>
    </header>
  )
}

export default function App() {
  useBrandTokens()

  const [currentPage, setCurrentPage] = useState(() => window.location.hash.slice(1) || 'home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)

  const navigate = (id: string) => {
    setCurrentPage(id)
    window.location.hash = id
    window.scrollTo(0, 0)
    setSidebarOpen(false)
  }

  useEffect(() => {
    const onHash = () => { const id = window.location.hash.slice(1); if (id) setCurrentPage(id) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Captures the currently visible page (#pdf-capture-root) and downloads it as a PDF.
  const handleDownloadPdf = async () => {
    const captureRoot = document.getElementById('pdf-capture-root')
    if (!captureRoot) return
    setPdfGenerating(true)

    const sidebar  = document.querySelector('.sidebar') as HTMLElement | null
    const mHeader  = document.querySelector('.mobile-header') as HTMLElement | null
    const overlay  = document.querySelector('.sidebar-overlay') as HTMLElement | null
    const pageNavs = document.querySelectorAll<HTMLElement>('.page-nav')
    const main     = document.querySelector('.main') as HTMLElement | null

    // display:none removes the sidebar from layout entirely — visibility:hidden would
    // leave a blank strip since the element still occupies its box.
    const prevSidebarDisplay = sidebar ? sidebar.style.display : ''
    if (sidebar) sidebar.style.display = 'none'

    const chrome = [mHeader, overlay].filter((el): el is HTMLElement => !!el)
    chrome.forEach(el => { el.style.visibility = 'hidden' })

    const prevPageNavDisplays = Array.from(pageNavs).map(el => el.style.display)
    pageNavs.forEach(el => { el.style.display = 'none' })

    const prevMargin = main ? main.style.marginLeft : ''
    if (main) main.style.marginLeft = '0'

    const origScrollY = window.scrollY
    window.scrollTo(0, 0)

    // Wait two frames for the layout/scroll changes above to fully settle before measuring.
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

    try {
      const [domtoimage, { default: jsPDF }] = await Promise.all([
        import('dom-to-image-more'),
        import('jspdf'),
      ])

      // Lift overflow + height constraints so scrollHeight reflects the full content.
      const toRestore: Array<{ el: HTMLElement; overflow: string; height: string }> = []
      const unconstrain = (el: HTMLElement) => {
        toRestore.push({ el, overflow: el.style.overflow, height: el.style.height })
        el.style.overflow = 'visible'
        el.style.height = 'auto'
      }
      unconstrain(captureRoot)
      captureRoot.querySelectorAll<HTMLElement>('.page, .portrait-intro, .logo-hero, .fg-overview, .intro-layout').forEach(unconstrain)

      const captureW = captureRoot.offsetWidth
      const captureH = Math.max(captureRoot.scrollHeight, captureRoot.offsetHeight)

      const dataUrl = await domtoimage.toJpeg(captureRoot, {
        quality: 0.92,
        width: captureW,
        height: captureH,
        bgcolor: '#ffffff',
      })

      for (const { el, overflow, height } of toRestore) {
        el.style.overflow = overflow
        el.style.height = height
      }

      const pxToPt = 72 / 96
      const pdfW = captureW * pxToPt
      const pdfH = captureH * pxToPt
      const pdf = new jsPDF({
        orientation: pdfW > pdfH ? 'l' : 'p',
        unit: 'pt',
        format: [pdfW, pdfH],
        compress: true,
      })
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfW, pdfH)

      const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')
      pdf.save(`${slug}-${currentPage}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert(`PDF error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      if (sidebar) sidebar.style.display = prevSidebarDisplay
      chrome.forEach(el => { el.style.visibility = '' })
      pageNavs.forEach((el, i) => { el.style.display = prevPageNavDisplays[i] })
      if (main) main.style.marginLeft = prevMargin
      window.scrollTo(0, origScrollY)
      setPdfGenerating(false)
    }
  }

  const Section = SECTIONS[currentPage] ?? SECTIONS['home']

  return (
    <div className="layout">
      <MobileHeader onOpen={() => setSidebarOpen(true)} onHome={() => navigate('home')} />

      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onDownloadPdf={handleDownloadPdf}
        pdfGenerating={pdfGenerating}
      />

      <main className="main">
        <div id="pdf-capture-root">
          <Suspense fallback={<div style={{ padding: 64, fontFamily: 'Saans, sans-serif', color: '#999' }}>Loading…</div>}>
            <Section />
          </Suspense>
        </div>
        <PageNav currentPage={currentPage} onNavigate={navigate} />
      </main>
    </div>
  )
}
