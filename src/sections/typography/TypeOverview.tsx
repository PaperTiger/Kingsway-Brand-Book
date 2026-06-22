import brand, { darkestPrimary } from '../../brand.config'

const df = brand.typography.displayFont
const bf = brand.typography.bodyFont

export default function TypeOverview() {
  return (
    <div className="fg-overview" style={{ background: darkestPrimary.hex, color: 'var(--fg-overview-text)' }}>
      {/* Left col */}
      <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-overview-text)', alignSelf: 'start' }}>
        <p style={{ margin: '0 0 14px' }}>{df} is a low-contrast geometric sans-serif built for on-screen readability. Its clean, neutral structure gives {brand.meta.client} headlines presence without shouting: modern, technical, and approachable.</p>
        <p style={{ margin: '0 0 24px' }}>It pairs with <strong>{bf}</strong> for body copy: a workhorse screen typeface engineered for legibility at every size, from data labels to long-form copy. Together they cover display, headline, label, and body across every {brand.meta.client} surface.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <a href="https://fonts.google.com/specimen/DM+Sans" target="_blank" rel="noopener" className="dl-btn" style={{ background: 'var(--fg-overview-text)', color: 'var(--fg-overview-bg)', marginTop: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download {df}
          </a>
          <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener" className="dl-btn-outline-white" style={{ marginTop: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Download {bf}
          </a>
        </div>
      </div>

      {/* Right col: large type at top, alphabet pushed to bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <div style={{ containerType: 'inline-size' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 300, fontSize: 'clamp(40px,22cqi,190px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--fg-overview-text)', whiteSpace: 'nowrap', marginTop: '-0.12em' }}>{df}</div>
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.25)', containerType: 'inline-size' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 500, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 400, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>abcdefghijklmnopqrstuvwxyz</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontWeight: 400, fontSize: 'clamp(11px,4.6cqi,28px)', letterSpacing: '-0.005em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>1234567890!@#$%&amp;*.,;:/{}[]()?!</div>
        </div>
      </div>
    </div>
  )
}
