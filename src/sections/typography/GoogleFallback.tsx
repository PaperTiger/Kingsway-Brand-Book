import brand from '../../brand.config'

const rows = [
  {
    role: 'Display headline',
    face: 'DM Sans', weight: 'Bold',
    specs: '24–72 px · −1% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "var(--charcoal)" }}>
        Design that works<br/>as hard as the brand.
      </div>
    ),
  },
  {
    role: 'Small headline',
    face: 'DM Sans', weight: 'SemiBold',
    specs: '18–28 px · −1% tracking · 100% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "clamp(18px,2.5vw,28px)", lineHeight: 1, letterSpacing: "-0.01em", color: "var(--charcoal)" }}>
        Concise subtitle for additional context
      </div>
    ),
  },
  {
    role: 'Eyebrow / label',
    face: 'DM Sans', weight: 'Medium',
    specs: '10–12 px · +8% tracking · 100% leading · UPPERCASE',
    ex: (
      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: 1, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--charcoal)" }}>
        Section label / eyebrow text
      </div>
    ),
  },
  {
    role: 'Body copy large',
    face: 'DM Sans', weight: 'Regular',
    specs: '18 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.4, color: "var(--charcoal)", maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    face: 'DM Sans', weight: 'Regular',
    specs: '16 px · 0% tracking · 140% leading · Sentence case',
    ex: (
      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400, fontSize: "clamp(14px,1.2vw,16px)", lineHeight: 1.4, color: "var(--charcoal)", maxWidth: 560 }}>
        {brand.specimens.fallbackGoogle16}
      </div>
    ),
  },
]

export default function GoogleFallback() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Google fallback font</h2>
      <p className="section-intro">
        When DM Sans is unavailable but web fonts can load, <strong>DM Sans from Google Fonts</strong> is
        the designated fallback. It is not a replacement for locally hosted DM Sans in branded communications.
      </p>
      <div style={{ background: "#F5F5F5", padding: "14px 18px", fontFamily: "monospace", fontSize: 12, color: "var(--charcoal)", marginBottom: 12 }}>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      </div>
      <div style={{ background: "#F5F5F5", padding: "14px 18px", fontFamily: "monospace", fontSize: 12, color: "var(--charcoal)", marginBottom: 32 }}>
        font-family: 'DM Sans', Arial, sans-serif;
      </div>
      <a href="https://fonts.google.com/specimen/DM+Sans" target="_blank" rel="noopener" className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Download DM Sans on Google Fonts
      </a>

      {rows.map(row => (
        <div key={row.role} style={{ borderTop: "1px solid #E5E5E5", paddingTop: 28, paddingBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--charcoal)" }}>
              {row.role}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4D4D4D", letterSpacing: "0.01em" }}>
              {row.face} · {row.weight} · {row.specs}
            </div>
          </div>
          {row.ex}
        </div>
      ))}
    </div>
  )
}
