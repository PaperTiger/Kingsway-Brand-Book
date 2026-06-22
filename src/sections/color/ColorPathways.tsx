const ramps = [
  {
    name: 'Pale Blue',
    steps: [
      { hex: '#F7FAFC', label: '1', textHex: '#010F1D' },
      { hex: '#BED2E0', label: '2', textHex: '#010F1D', anchor: true },
      { hex: '#5A8099', label: '3', textHex: '#F7FAFC' },
      { hex: '#243F52', label: '4', textHex: '#F7FAFC' },
      { hex: '#010F1D', label: '5', textHex: '#F7FAFC', anchor: true },
    ],
  },
  {
    name: 'Dark Blue',
    steps: [
      { hex: '#F3F8FD', label: '1', textHex: '#010F1D' },
      { hex: '#B6D9F4', label: '2', textHex: '#010F1D' },
      { hex: '#458FCE', label: '3', textHex: '#F7FAFC' },
      { hex: '#195185', label: '4', textHex: '#F7FAFC' },
      { hex: '#082C48', label: '5', textHex: '#F1EBC9', anchor: true },
    ],
  },
  {
    name: 'Mid Blue',
    steps: [
      { hex: '#F4F9FC', label: '1', textHex: '#010F1D' },
      { hex: '#BCDAEC', label: '2', textHex: '#010F1D' },
      { hex: '#5F96BD', label: '3', textHex: '#F7FAFC' },
      { hex: '#3B6684', label: '4', textHex: '#FFFFFF', anchor: true },
      { hex: '#132433', label: '5', textHex: '#F7FAFC' },
    ],
  },
  {
    name: 'Tan',
    steps: [
      { hex: '#FCFCF4', label: '1', textHex: '#010F1D' },
      { hex: '#F1EBC9', label: '2', textHex: '#082C48', anchor: true },
      { hex: '#9D9152', label: '3', textHex: '#F7FAFC' },
      { hex: '#554622', label: '4', textHex: '#F7FAFC' },
      { hex: '#1D1606', label: '5', textHex: '#F7FAFC' },
    ],
  },
  {
    name: 'Primary Orange',
    steps: [
      { hex: '#FFF5EF', label: '1', textHex: '#010F1D' },
      { hex: '#FFC099', label: '2', textHex: '#010F1D' },
      { hex: '#F05102', label: '3', textHex: '#000000', anchor: true },
      { hex: '#B1290B', label: '4', textHex: '#F7FAFC' },
      { hex: '#441109', label: '5', textHex: '#F7FAFC' },
    ],
  },
]

export default function ColorPathways() {
  return (
    <div className="page">
      <div className="section-label">Color</div>
      <h2 className="section-title">Color pathways</h2>
      <p className="section-intro">
        Each brand color mapped across five tonal steps, from lightest tint (1) to deepest shade (5).
        Anchored steps correspond to the named brand colors. Use these ramps for backgrounds, hover states,
        surface differentiation, and data visualisation.
      </p>

      {ramps.map(ramp => (
        <div key={ramp.name} style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'Saans, sans-serif', fontWeight: 600, fontSize: 11,
            color: '#010F1D', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {ramp.name}
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {ramp.steps.map(step => (
              <div
                key={step.label}
                style={{
                  background: step.hex,
                  flex: 1,
                  minHeight: 88,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '8px 8px 10px',
                  ...(step.anchor ? { outline: '2px solid rgba(0,0,0,0.15)', outlineOffset: '-2px' } : {}),
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 9,
                  color: step.textHex, lineHeight: 1.3, opacity: 0.7, marginBottom: 1,
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: step.anchor ? 11 : 9,
                  fontWeight: step.anchor ? 700 : 400,
                  color: step.textHex,
                }}>
                  {step.hex}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
