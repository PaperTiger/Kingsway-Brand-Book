import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'

function hexToRgb(hex: string): [number,number,number] {
  const h = hex.replace('#','')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}

function linearize(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function luminance([r,g,b]: [number,number,number]) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrast(hex1: string, hex2: string) {
  const l1 = luminance(hexToRgb(hex1))
  const l2 = luminance(hexToRgb(hex2))
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10
}

const t = brand.tokens

interface Combo {
  bgHex: string
  fgHex: string
  label: string
  markFill: string
  wordmarkFill: string
  innerTextFill: string
  outline?: boolean
}

const combos: Combo[] = [
  {
    bgHex: t['primary-orange'], fgHex: '#000000', label: 'Primary Orange / Black',
    markFill: '#000000', wordmarkFill: '#000000', innerTextFill: t['primary-orange'],
  },
  {
    bgHex: t['dark-blue'], fgHex: t['tan'], label: 'Dark Blue / Tan',
    markFill: t['tan'], wordmarkFill: t['tan'], innerTextFill: t['dark-blue'],
  },
  {
    bgHex: t['black'], fgHex: t['pale-blue'], label: 'Midnight Blue / Pale Blue',
    markFill: t['pale-blue'], wordmarkFill: t['pale-blue'], innerTextFill: t['black'],
  },
  {
    bgHex: t['white'], fgHex: '#000000', label: 'White / Black',
    markFill: '#000000', wordmarkFill: '#000000', innerTextFill: t['white'],
    outline: true,
  },
  {
    bgHex: t['tan'], fgHex: t['dark-blue'], label: 'Tan / Dark Blue',
    markFill: t['dark-blue'], wordmarkFill: t['dark-blue'], innerTextFill: t['tan'],
  },
  {
    bgHex: t['mid-blue'], fgHex: '#FFFFFF', label: 'Mid Blue / White',
    markFill: '#FFFFFF', wordmarkFill: '#FFFFFF', innerTextFill: t['mid-blue'],
  },
  {
    bgHex: t['pale-blue'], fgHex: t['dark-blue'], label: 'Pale Blue / Dark Blue',
    markFill: t['dark-blue'], wordmarkFill: t['dark-blue'], innerTextFill: t['pale-blue'],
  },
  {
    bgHex: t['white'], fgHex: t['dark-blue'], label: 'White / Dark Blue',
    markFill: t['dark-blue'], wordmarkFill: t['dark-blue'], innerTextFill: t['white'],
    outline: true,
  },
]

export default function ColorCombinations() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Combinations & accessibility</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          Approved color pairings with live WCAG contrast ratios.
          AA requires 4.5:1 for body text, AAA requires 7:1.
        </p>
      </div>

      <div className="combos-grid">
        {combos.map(c => {
          const ratio = contrast(c.bgHex, c.fgHex)
          const aa  = ratio >= 4.5
          const aaa = ratio >= 7
          const level = aaa ? 'AAA' : aa ? 'AA' : 'FAIL'

          return (
            <div key={c.label} style={{
              background: c.bgHex,
              padding: 'clamp(20px, 2.5vw, 40px)',
              display: 'flex', flexDirection: 'column',
              minHeight: 'clamp(180px, 20vw, 280px)',
              ...(c.outline ? { boxShadow: 'inset 0 0 0 1px #C8C8C8' } : {}),
            }}>
              <div style={{ flex: 1, paddingBottom: 'clamp(16px, 2vw, 28px)' }}>
                <FullLogoSvg
                  markFill={c.markFill}
                  wordmarkFill={c.wordmarkFill}
                  innerTextFill={c.innerTextFill}
                  style={{ width: '100%', maxWidth: 'clamp(140px, 16vw, 220px)', height: 'auto' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
                  color: c.fgHex, letterSpacing: '0.02em',
                }}>
                  {c.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: c.bgHex, background: c.fgHex,
                    padding: '3px 7px', borderRadius: 2,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    {level !== 'FAIL' && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {level}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: c.fgHex }}>
                    {ratio}:1
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
