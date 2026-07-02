import brand from '../../brand.config'
import { MarkSimpleSvg } from '../../components/ui/LogoSvg'

const t = brand.tokens

const avatarBgs = [
  { bg: t['white'],          mark: t['dark-blue'],  label: 'White',          outline: '1px solid #D0D8DF' },
  { bg: t['primary-orange'], mark: '#000000',       label: 'Primary Orange', outline: undefined },
  { bg: t['dark-blue'],      mark: t['tan'],        label: 'Dark Blue',      outline: undefined },
  { bg: t['black'],          mark: t['pale-blue'],  label: 'Midnight Blue',  outline: undefined },
]

const faviconSizes = [64, 48, 32, 16]

export default function LogoAvatar() {
  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Avatar &amp; favicon</h2>
      <p className="section-intro">
        Use Mark Simple for social avatars, profile images, and favicons. The clean chevron
        holds up at any size without the circle detail getting lost.
      </p>

      <a href={`${import.meta.env.BASE_URL}downloads/brand-logos.zip`} download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
      </a>

      {/* Avatars */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Avatars: Mark Simple</div>
          <a href={`${import.meta.env.BASE_URL}downloads/kingsway-avatars.zip`} download className="dl-btn" style={{ marginTop: 0, marginBottom: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download avatars (1000&times;1000 PNG)
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 680 }}>
          {avatarBgs.map(a => (
            <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{
                width: "100%", aspectRatio: "1", borderRadius: "50%", background: a.bg,
                display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                ...(a.outline ? { boxShadow: `inset 0 0 0 1px #C8C8C8` } : {}),
              }}>
                <MarkSimpleSvg markFill={a.mark} style={{ width: "44%", height: "auto" }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--black)", letterSpacing: "0.04em", fontFamily: "Saans, sans-serif" }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Favicons */}
      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 80 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Favicons: Mark Simple</div>
          <a href={`${import.meta.env.BASE_URL}downloads/kingsway-favicons.zip`} download className="dl-btn" style={{ marginTop: 0, marginBottom: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download favicons (.ico + PNG)
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 760 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--black)", letterSpacing: "0.04em", marginBottom: 16, fontFamily: "Saans, sans-serif" }}>On light</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
              {faviconSizes.map(size => (
                <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  {size === 16
                    ? <MarkSimpleSvg markFill={t['dark-blue']} style={{ width: size, height: size }} />
                    : <div style={{ width: size, height: size, background: t['white'], border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MarkSimpleSvg markFill={t['dark-blue']} style={{ width: "60%", height: "60%" }} />
                      </div>
                  }
                  <div style={{ fontSize: 10, color: "var(--black)", fontFamily: "Saans, sans-serif" }}>{size}px</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--black)", letterSpacing: "0.04em", marginBottom: 16, fontFamily: "Saans, sans-serif" }}>On dark</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
              {faviconSizes.map(size => (
                <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  {size === 16
                    ? <MarkSimpleSvg markFill={t['pale-blue']} style={{ width: size, height: size }} />
                    : <div style={{ width: size, height: size, background: t['black'], display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MarkSimpleSvg markFill={t['pale-blue']} style={{ width: "60%", height: "60%" }} />
                      </div>
                  }
                  <div style={{ fontSize: 10, color: "var(--black)", fontFamily: "Saans, sans-serif" }}>{size}px</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
