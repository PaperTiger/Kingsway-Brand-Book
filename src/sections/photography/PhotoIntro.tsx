export default function PhotoIntro() {
  return (
    <div className="portrait-intro">
      <div style={{ display: 'flex', flexDirection: 'column', padding: 32, boxSizing: 'border-box' }}>
        <div className="section-label">Photography</div>
        <p style={{ fontFamily: 'Saans, sans-serif', fontWeight: 300,
          fontSize: 'clamp(24px,3.2vw,48px)', lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'var(--black)', maxWidth: 720, margin: '16px 0 0' }}>
          Photography that earns its place.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: 'Saans, sans-serif', fontSize: 16, lineHeight: 1.4,
            color: 'var(--black)', margin: 0 }}>
            Kingsway imagery should feel real and human. Favor candid teams at work,
            real environments, and clean product shots over staged stock. Photography builds
            trust by showing how the work actually gets done.
          </p>
          <div className="placeholder-badge" style={{ marginTop: 20 }}>
            <strong>Placeholder imagery.</strong> Replace with real Kingsway photography before publishing.
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://picsum.photos/seed/photo-hero/800/1100" alt=""
          style={{ position: 'absolute', bottom: 0, right: 0, width: '88%', height: '90%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
