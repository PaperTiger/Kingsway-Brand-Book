import brand from '../../brand.config'

const df = brand.typography.displayFont
const bf = brand.typography.bodyFont

export default function TypeIntro() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Introduction</h2>
      <p className="section-intro">
        {brand.meta.client} uses two typefaces: {df} for display and headlines,
        {bf} for body copy and UI text. Together they cover every scale from large
        campaign headlines to small data labels.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 48 }}>
        <div style={{ background: '#111', padding: '40px 36px' }}>
          <div style={{ fontFamily: `${df}, sans-serif`, fontWeight: 300, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-0.04em', color: '#fff', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 11, color: '#4D4D4D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Display & Headlines</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontSize: 20, fontWeight: 600, color: '#fff' }}>{df}</div>
        </div>
        <div style={{ background: '#F8F8F8', padding: '40px 36px' }}>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontWeight: 400, fontSize: 'clamp(40px,6vw,72px)', color: '#111', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 11, color: '#4D4D4D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Body & UI</div>
          <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 20, fontWeight: 600, color: '#111' }}>{bf}</div>
        </div>
      </div>
      <p style={{ fontFamily: `${bf}, sans-serif`, fontSize: 15, lineHeight: 1.7, color: '#333', maxWidth: 560 }}>
        Never substitute another typeface without approval. The pairing is carefully
        chosen for on-screen legibility, brand consistency, and technical availability
        across all platforms.
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 32, padding: '16px 20px', background: '#F4F6F8', borderLeft: '3px solid #082C48', maxWidth: 560 }}>
        <span style={{ fontFamily: `${bf}, sans-serif`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#082C48', whiteSpace: 'nowrap', paddingTop: 1 }}>SS01</span>
        <p style={{ fontFamily: `${bf}, sans-serif`, fontSize: 13, lineHeight: 1.5, color: '#333', margin: 0 }}>
          Saans uses stylistic set SS01 for the single-story alternate 'a'. Always enable{' '}
          <code style={{ fontFamily: 'monospace', fontSize: 12, background: '#E5E9ED', padding: '1px 5px', borderRadius: 3 }}>font-feature-settings: "ss01" 1</code>{' '}
          wherever Saans is implemented.
        </p>
      </div>
    </div>
  )
}
