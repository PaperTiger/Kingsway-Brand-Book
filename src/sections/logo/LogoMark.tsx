import brand from '../../brand.config'
import { LogoMarkSvg, MarkSimpleSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'

const t = brand.tokens

const combos = [
  { bg: t['white'],          mark: t['dark-blue'],  label: 'White',          lbl: t['dark-blue']  },
  { bg: t['tan'],            mark: t['dark-blue'],  label: 'Tan',            lbl: t['dark-blue']  },
  { bg: t['pale-blue'],      mark: t['dark-blue'],  label: 'Pale Blue',      lbl: t['dark-blue']  },
  { bg: t['primary-orange'], mark: '#000000',       label: 'Primary Orange', lbl: '#000000'       },
  { bg: t['mid-blue'],       mark: '#FFFFFF',       label: 'Mid Blue',       lbl: '#FFFFFF'       },
  { bg: t['dark-blue'],      mark: t['tan'],        label: 'Dark Blue',      lbl: t['tan']        },
  { bg: t['black'],          mark: t['pale-blue'],  label: 'Midnight Blue',  lbl: t['pale-blue']  },
]

export default function LogoMark() {
  return (
    <div>
      {/* Hero header */}
      <div className="logo-hero" style={{ background: t['dark-blue'], minHeight: 280 }}>
        <LogoMarkSvg markFill="#fff" style={{ maxHeight: 120, width: 'auto' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Logo mark</h2>
        <p className="section-intro">
          The mark family has two versions: the full mark in a circle and Mark Simple, a standalone
          chevron for small sizes and technical contexts where the circle would be lost.
        </p>
        <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Mark variation: circle mark */}
        <div className="content-block" style={{ marginBottom: 56 }}>
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 19, margin: '0 0 8px', color: '#111' }}>Mark</h3>
          <p style={{ fontFamily: "'Saans', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            The mark in its circle is the primary standalone symbol. Use it for social avatars, app icons at larger sizes, and graphic accents where the full lockup cannot fit.
          </p>
          <h4 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 15, margin: '0 0 12px', color: '#111' }}>Clearspace</h4>
          <p style={{ fontFamily: "'Saans', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/kingsway-mark-dark-blue.svg`}
            logoAlt="Logo mark clearspace"
            csX={75} logoMaxHeight={150}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Mark variation: Mark Simple */}
        <div className="content-block" style={{ marginBottom: 56 }}>
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 19, margin: '0 0 8px', color: '#111' }}>Mark Simple</h3>
          <p style={{ fontFamily: "'Saans', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            Mark Simple is the chevron without the enclosing circle. Use it for favicons, small app icons (16px and below), loading spinners, and any context where the circle detail would disappear at small sizes.
          </p>

          {/* Simple mark preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'start', gap: 24, marginBottom: 32 }}>
            {[
              { bg: t['dark-blue'], fill: t['tan'],        size: 80 },
              { bg: t['white'],     fill: t['dark-blue'],  size: 80 },
              { bg: t['primary-orange'], fill: '#000000',  size: 80 },
            ].map((v, i) => (
              <div key={i} style={{ background: v.bg, borderRadius: 12, width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(v.bg === t['white'] ? { boxShadow: 'inset 0 0 0 1px #C8C8C8' } : {}) }}>
                <MarkSimpleSvg markFill={v.fill} style={{ maxHeight: v.size, width: 'auto' }} />
              </div>
            ))}
          </div>

          <h4 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 15, margin: '0 0 12px', color: '#111' }}>Clearspace</h4>
          <p style={{ fontFamily: "'Saans', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark simple. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={`${import.meta.env.BASE_URL}images/logos/kingsway-mark-simple-dark-blue.svg`}
            logoAlt="Mark Simple clearspace"
            csX={60} logoMaxHeight={120}
            defLabel={`½ the height of Mark Simple`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${combos.length}, 1fr)`, gap: 0 }}>
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center', aspectRatio: '1' }}>
                <LogoMarkSvg markFill={c.mark} style={{ maxHeight: 80, width: 'auto' }} />
                <span style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
