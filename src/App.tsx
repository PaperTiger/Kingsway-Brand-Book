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

// All page IDs in document order (cover first, then nav order, deduped)
function buildAllPageIds(): string[] {
  const ids: string[] = ['home']
  const seen = new Set<string>(['home'])
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (!seen.has(item.id)) { ids.push(item.id); seen.add(item.id) }
      if (item.children) {
        for (const child of item.children) {
          if (!seen.has(child.id)) { ids.push(child.id); seen.add(child.id) }
        }
      }
    }
  }
  return ids
}

const ALL_PAGE_IDS = buildAllPageIds()

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
          <path d="M0 1h18M0 7h18M0 13h18" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
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
            letterSpacing: '-0.02em', color: '#111' }}>
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
  const [printMode, setPrintMode] = useState(false)
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

  const handlePrint = async () => {
    // Pre-load all section modules so they render without Suspense delays
    await Promise.all([
      import('./sections/home/Cover'),
      import('./sections/home/ViIntro'),
      import('./sections/logo/MainWordmark'),
      import('./sections/logo/FullLogo'),
      import('./sections/logo/StackedLogo'),
      import('./sections/logo/LogoMark'),
      import('./sections/logo/LogoAvatar'),
      import('./sections/logo/Cobranding'),
      import('./sections/logo/LogoAvoid'),
      import('./sections/color/ColorIntro'),
      import('./sections/color/PrimaryPalette'),
      import('./sections/color/SecondaryPalette'),
      import('./sections/color/ColorCombinations'),
      import('./sections/color/ColorPathways'),
      import('./sections/typography/TypeIntro'),
      import('./sections/typography/TypeOverview'),
      import('./sections/typography/TypeUsage'),
      import('./sections/typography/TypeSpecimen'),
      import('./sections/typography/TypeScale'),
      import('./sections/typography/GoogleFallback'),
      import('./sections/typography/SystemFallback'),
      import('./sections/typography/TypeAvoid'),
      import('./sections/photography/PhotoIntro'),
      import('./sections/photography/PhotoExamples'),
      import('./sections/photography/PhotoDos'),
      import('./sections/photography/PhotoDonts'),
      import('./sections/dataviz/DataVizColors'),
      import('./sections/dataviz/DataVizCharts'),
      import('./sections/applications/AppIntro'),
      import('./sections/applications/AppExamples'),
      import('./sections/iconography/IconIntro'),
      import('./sections/print/PrintSpecs'),
    ])
    // Wait for web fonts to finish loading before switching layout — prevents FOUT flash
    await document.fonts.ready
    setPrintMode(true)
    document.body.classList.add('print-active')
  }

  const handleDownloadPdf = async () => {
    const pages = Array.from(document.querySelectorAll('.print-book-page')) as HTMLElement[]
    if (!pages.length) return
    setPdfGenerating(true)
    try {
      const [domtoimage, { default: jsPDF }] = await Promise.all([
        import('dom-to-image-more'),
        import('jspdf'),
      ])
      const pageW = pages[0].offsetWidth
      let pdf: InstanceType<typeof jsPDF> | null = null
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]

        // Lift overflow + height constraints on the page and key inner containers
        // so scrollHeight reflects the full content, not the visible box.
        const toRestore: Array<{ el: HTMLElement; overflow: string; height: string }> = []
        const unconstrain = (el: HTMLElement) => {
          toRestore.push({ el, overflow: el.style.overflow, height: el.style.height })
          el.style.overflow = 'visible'
          el.style.height = 'auto'
        }
        unconstrain(page)
        page.querySelectorAll<HTMLElement>('.page, .portrait-intro, .logo-hero, .fg-overview, .intro-layout').forEach(unconstrain)

        const pageH = Math.max(page.scrollHeight, page.offsetHeight)
        const dataUrl = await domtoimage.toJpeg(page, {
          quality: 0.92,
          width: pageW,
          height: pageH,
          bgcolor: '#ffffff',
        })

        for (const { el, overflow, height } of toRestore) {
          el.style.overflow = overflow
          el.style.height = height
        }
        if (!pdf) {
          pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [pageW, pageH], compress: true })
        } else {
          pdf.addPage([pageW, pageH], 'landscape')
        }
        pdf.addImage(dataUrl, 'JPEG', 0, 0, pageW, pageH, `p${i}`, 'FAST')
      }
      const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')
      pdf!.save(`${slug}-brand-guidelines.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert(`PDF error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setPdfGenerating(false)
    }
  }

  const handleExitPrint = () => {
    setPrintMode(false)
    document.body.classList.remove('print-active')
  }

  // Bridge for sections that have their own print buttons
  useEffect(() => {
    ;(window as any).__brandBookPrint = handlePrint
    return () => { delete (window as any).__brandBookPrint }
  })

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
        onPrint={handlePrint}
      />

      <main className="main">
        {printMode ? (
          <div className="print-all-pages">
            <div className="no-print" style={{
              position: 'sticky', top: 0, zIndex: 100,
              background: '#111', color: '#fff',
              padding: '10px 24px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 16,
            }}>
              <button
                onClick={handleExitPrint}
                style={{
                  fontFamily: 'Saans, sans-serif', fontSize: 12, fontWeight: 500,
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                  padding: '6px 14px', borderRadius: 4, flexShrink: 0,
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={pdfGenerating}
                style={{
                  fontFamily: 'Saans, sans-serif', fontSize: 12, fontWeight: 600,
                  background: pdfGenerating ? 'rgba(255,255,255,0.5)' : '#fff',
                  color: '#111', border: 'none',
                  cursor: pdfGenerating ? 'default' : 'pointer',
                  padding: '6px 18px', borderRadius: 4, flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                {pdfGenerating ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            {ALL_PAGE_IDS.map(id => {
              const S = SECTIONS[id]
              return S ? (
                <div key={id} className="print-book-page">
                  <Suspense fallback={null}><S /></Suspense>
                </div>
              ) : null
            })}
          </div>
        ) : (
          <>
            <Suspense fallback={<div style={{ padding: 64, fontFamily: 'Saans, sans-serif', color: '#999' }}>Loading…</div>}>
              <Section />
            </Suspense>
            <PageNav currentPage={currentPage} onNavigate={navigate} />
          </>
        )}
      </main>
    </div>
  )
}
