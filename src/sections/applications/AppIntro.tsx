export default function AppIntro() {
  return (
    <div className="portrait-intro">
      <div style={{ display: 'flex', flexDirection: 'column', padding: 32, boxSizing: 'border-box' }}>
        <div className="section-label">Applications</div>
        <p style={{ fontFamily: 'Saans, sans-serif', fontWeight: 600,
          fontSize: 'clamp(24px,3.2vw,48px)', lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'var(--black)', maxWidth: 720, margin: '16px 0 0' }}>
          Every surface. Every scale.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: 'Saans, sans-serif', fontSize: 16, lineHeight: 1.4,
            color: 'var(--black)', margin: 0 }}>
            The Kingsway brand is judged in its most everyday moments: a pitch deck slide,
            a reporting dashboard, a social ad, a conference booth. This section shows how the
            system holds up across collateral, digital media, and merchandise.
          </p>
          <div className="placeholder-badge" style={{ marginTop: 20 }}>
            <strong>Placeholder mockups.</strong> Replace with real Kingsway application examples before publishing.
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://picsum.photos/seed/app-hero/800/1100" alt=""
          style={{ position: 'absolute', bottom: 0, right: 0, width: '88%', height: '90%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
