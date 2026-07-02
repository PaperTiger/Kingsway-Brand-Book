import brand from '../../brand.config'

// Responsive clamp sizes for display/headline levels; body sizes are fixed
const CLAMP_SIZE: Record<string, string> = {
  '96px': 'clamp(48px,10vw,96px)',
  '73px': 'clamp(36px,7.6vw,73px)',
  '64px': 'clamp(32px,6.6vw,64px)',
  '48px': 'clamp(28px,5vw,48px)',
  '42px': 'clamp(24px,4.4vw,42px)',
  '32px': 'clamp(20px,3.3vw,32px)',
}

// Specimen text per type scale level
const SPECIMEN_TEXT: Record<string, string> = {
  'Display XL':  brand.specimens.display96,
  'Display L':   brand.specimens.display73,
  'Display M':   brand.specimens.display64,
  'Display S':   brand.specimens.display48,
  'Headline XL': brand.specimens.headline42,
  'Headline L':  brand.specimens.headline32,
  'Headline M':  brand.specimens.headline24,
  'Headline S':  brand.specimens.headline21,
  'Body XL':     brand.specimens.body18,
  'Body L':      brand.specimens.body16,
  'Body M':      brand.specimens.body14,
  'Caption':     brand.specimens.body12,
}

export default function TypeSpecimen() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Type specimen</h2>
      <p className="section-intro">
        The full type scale in use: display through caption, Saans across every level.
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 32, padding: '16px 20px', background: '#F4F6F8', borderLeft: '3px solid #082C48', maxWidth: 640 }}>
        <span style={{ fontFamily: 'Saans, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#082C48', whiteSpace: 'nowrap', paddingTop: 1 }}>SS01</span>
        <p style={{ fontFamily: 'Saans, sans-serif', fontSize: 13, lineHeight: 1.5, color: 'var(--black)', margin: 0 }}>
          Saans uses stylistic set SS01 for the single-story alternate 'a'. Always enable{' '}
          <code style={{ fontFamily: 'monospace', fontSize: 12, background: '#E5E9ED', padding: '1px 5px', borderRadius: 3 }}>font-feature-settings: "ss01" 1</code>{' '}
          wherever Saans is implemented.
        </p>
      </div>

      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        {brand.typeScale.map(s => (
          <div key={s.name} className="specimen-row">
            <div className="specimen-meta">{s.size}</div>
            <div style={{
              fontFamily: `'${s.family}', sans-serif`,
              fontWeight: s.weight,
              fontSize: CLAMP_SIZE[s.size] ?? s.size,
              letterSpacing: s.ls,
              lineHeight: s.lh,
              color: 'var(--black)',
            }}>
              {SPECIMEN_TEXT[s.name] ?? s.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
