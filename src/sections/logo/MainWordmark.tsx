import brand from '../../brand.config'
import { MainWordmarkSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'

const t = brand.tokens

const combos = [
  { bg: t['white'],          wm: t['dark-blue'],  lbl: t['dark-blue'],  label: 'White'         },
  { bg: t['tan'],            wm: t['dark-blue'],  lbl: t['dark-blue'],  label: 'Tan'           },
  { bg: t['pale-blue'],      wm: t['dark-blue'],  lbl: t['dark-blue'],  label: 'Pale Blue'     },
  { bg: t['primary-orange'], wm: '#000000',       lbl: '#000000',       label: 'Primary Orange'},
  { bg: t['mid-blue'],       wm: '#FFFFFF',       lbl: '#FFFFFF',       label: 'Mid Blue'      },
  { bg: t['dark-blue'],      wm: t['tan'],        lbl: t['tan'],        label: 'Dark Blue'     },
  { bg: t['black'],          wm: t['pale-blue'],  lbl: t['pale-blue'],  label: 'Midnight Blue' },
]

export default function MainWordmark() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'] }}>
        <MainWordmarkSvg wordmarkFill="#fff" style={{ maxHeight: 48, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Main wordmark</h2>
        <p className="section-intro">
          The main wordmark is the primary text expression of the {brand.meta.client} brand.
          It features the full KINGSWAY lettering with the brand mark embedded in the A.
          Use it in contexts where clean typography takes precedence and no accompanying mark is needed.
        </p>
        <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            Maintain a minimum clearspace of <strong>x</strong> on all sides, where x equals half the cap height of the wordmark.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/kingsway-wordmark-dark-blue.svg`}
            logoAlt={`${brand.meta.client} wordmark clearspace`}
            csX={24} logoMaxHeight={48}
            defLabel="½ the cap height of the wordmark"
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, aspectRatio: '4/3', justifyContent: 'center', ...(c.bg === t['white'] ? { boxShadow: 'inset 0 0 0 1px #C8C8C8' } : {}) }}>
                <MainWordmarkSvg wordmarkFill={c.wm} style={{ maxHeight: 28, width: 'auto' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
