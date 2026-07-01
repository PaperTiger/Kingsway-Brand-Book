import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'

const t = brand.tokens

const combos = [
  { bg: t['white'],          label: 'White',          mark: t['dark-blue'],  wm: t['dark-blue'],  lbl: t['dark-blue']  },
  { bg: t['tan'],            label: 'Tan',            mark: t['dark-blue'],  wm: t['dark-blue'],  lbl: t['dark-blue']  },
  { bg: t['pale-blue'],      label: 'Pale Blue',      mark: t['dark-blue'],  wm: t['dark-blue'],  lbl: t['dark-blue']  },
  { bg: t['primary-orange'], label: 'Primary Orange', mark: '#000000',       wm: '#000000',        lbl: '#000000'       },
  { bg: t['mid-blue'],       label: 'Mid Blue',       mark: '#FFFFFF',       wm: '#FFFFFF',       lbl: '#FFFFFF'       },
  { bg: t['dark-blue'],      label: 'Dark Blue',      mark: t['tan'],        wm: t['tan'],         lbl: t['tan']        },
  { bg: t['black'],          label: 'Midnight Blue',  mark: t['pale-blue'],  wm: t['pale-blue'],  lbl: t['pale-blue']  },
]

export default function FullLogo() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'] }}>
        <FullLogoSvg markFill="#fff" wordmarkFill="#fff" style={{ maxHeight: 56, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Wordmark and Mark</h2>
        <p className="section-intro">
          The wordmark and mark lockup combines the KINGSWAY wordmark with the circle mark. Use it
          when both the name and the symbol should appear together, such as in presentations,
          reports, and branded materials where the full identity needs to be established.
        </p>
        <a href={`${import.meta.env.BASE_URL}downloads/brand-logos.zip`} download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Saans', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            Maintain a minimum clearspace of <strong>x</strong> on all sides, where x equals half the height of the {brand.meta.client} mark.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/kingsway-logo-full-dark-blue.svg`}
            logoAlt={`${brand.meta.client} clearspace`}
            csX={34} logoMaxHeight={68}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
          {combos.map(c => (
            <div key={c.label} style={{ background: c.bg, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, aspectRatio: '4/3', justifyContent: 'center' }}>
              <FullLogoSvg markFill={c.mark} wordmarkFill={c.wm} style={{ maxHeight: 40, width: 'auto' }} />
              <span style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
