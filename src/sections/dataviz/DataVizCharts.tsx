import brand from '../../brand.config'

const t = brand.tokens

// ── Donut segment path helper ────────────────────────────────────
function donutSegment(
  cx: number, cy: number, r: number, ir: number,
  startPct: number, pct: number,
): string {
  const τ = 2 * Math.PI
  const a0 = startPct * τ - Math.PI / 2
  const a1 = (startPct + pct) * τ - Math.PI / 2
  const x1 = cx + r  * Math.cos(a0), y1 = cy + r  * Math.sin(a0)
  const x2 = cx + r  * Math.cos(a1), y2 = cy + r  * Math.sin(a1)
  const ix1 = cx + ir * Math.cos(a0), iy1 = cy + ir * Math.sin(a0)
  const ix2 = cx + ir * Math.cos(a1), iy2 = cy + ir * Math.sin(a1)
  const large = pct > 0.5 ? 1 : 0
  const f = (n: number) => n.toFixed(2)
  return [
    `M ${f(x1)} ${f(y1)}`,
    `A ${r} ${r} 0 ${large} 1 ${f(x2)} ${f(y2)}`,
    `L ${f(ix2)} ${f(iy2)}`,
    `A ${ir} ${ir} 0 ${large} 0 ${f(ix1)} ${f(iy1)}`,
    'Z',
  ].join(' ')
}

// ── Bar chart data ────────────────────────────────────────────────
const BAR_DATA_LIGHT = [
  { label: 'Q1', value: 63, color: t['dark-blue'] },
  { label: 'Q2', value: 82, color: t['primary-orange'] },
  { label: 'Q3', value: 47, color: '#458FCE' },
  { label: 'Q4', value: 91, color: '#9D9152' },
  { label: 'Q5', value: 74, color: '#441109' },
]

const BAR_DATA_DARK = [
  { label: 'Q1', value: 63, color: t['pale-blue'] },
  { label: 'Q2', value: 82, color: t['primary-orange'] },
  { label: 'Q3', value: 47, color: '#458FCE' },
  { label: 'Q4', value: 91, color: '#9D9152' },
  { label: 'Q5', value: 74, color: t['white'] },
]

interface BarDatum { label: string; value: number; color: string }

function BarChart({ data, dark = false }: { data: BarDatum[]; dark?: boolean }) {
  const W = 460, H = 280
  const ml = 40, mr = 12, mt = 20, mb = 38
  const cW = W - ml - mr
  const cH = H - mt - mb
  const barW = 56
  const gap = 14
  const totalW = data.length * barW + (data.length - 1) * gap
  const startX = ml + (cW - totalW) / 2
  const gridPcts = [0, 25, 50, 75, 100]
  const gridColor       = dark ? 'rgba(255,255,255,0.12)' : 'rgba(8,44,72,0.15)'
  const labelColor      = dark ? 'rgba(255,255,255,0.75)' : '#082C48'
  const xLabelColor     = dark ? 'rgba(255,255,255,0.75)' : '#082C48'
  const valueLabelColor = dark ? 'rgba(255,255,255,0.9)'  : '#082C48'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%"
      style={{ display: "block", fontFamily: "'Saans', sans-serif" }}>
      {gridPcts.map(pct => {
        const y = mt + cH - (pct / 100) * cH
        return (
          <g key={pct}>
            <line x1={ml} y1={y} x2={W - mr} y2={y} stroke={gridColor} strokeWidth="0.5" />
            <text x={ml - 6} y={y + 4} textAnchor="end" fontSize="8" fontWeight="600" fill={labelColor}>{pct}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const barH = (d.value / 100) * cH
        const x = startX + i * (barW + gap)
        const y = mt + cH - barH
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} fill={d.color} />
            <text x={x + barW / 2} y={mt + cH + 15} textAnchor="middle"
              fontSize="9" fontWeight="600" fill={xLabelColor}>{d.label}</text>
            <text x={x + barW / 2} y={y - 6} textAnchor="middle"
              fontSize="8" fontWeight="600" fill={valueLabelColor}>{d.value}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Line chart ───────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const LINE_DATA = [
  { label: 'Series A', color: t['dark-blue'],      values: [42, 58, 51, 74, 67, 89] },
  { label: 'Series B', color: t['primary-orange'], values: [28, 35, 48, 42, 60, 72] },
]

function LineChart() {
  const W = 520, H = 260
  const ml = 44, mr = 16, mt = 20, mb = 44
  const cW = W - ml - mr
  const cH = H - mt - mb
  const n = MONTHS.length
  const xs = (i: number) => ml + (i / (n - 1)) * cW
  const ys = (v: number) => mt + cH - (v / 100) * cH

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%"
      style={{ display: "block", fontFamily: "'Saans', sans-serif" }}>
      {[25, 50, 75, 100].map(pct => {
        const y = ys(pct)
        return (
          <g key={pct}>
            <line x1={ml} y1={y} x2={W - mr} y2={y}
              stroke="rgba(8,44,72,0.15)" strokeWidth="0.5" strokeDasharray="4,4" />
            <text x={ml - 6} y={y + 4} textAnchor="end" fontSize="8" fontWeight="600"
              fill="#082C48">{pct}</text>
          </g>
        )
      })}
      <line x1={ml} y1={mt + cH} x2={W - mr} y2={mt + cH} stroke="rgba(8,44,72,0.15)" strokeWidth="0.5" />
      {MONTHS.map((m, i) => (
        <text key={m} x={xs(i)} y={mt + cH + 16} textAnchor="middle" fontSize="9" fontWeight="600"
          fill="#082C48">{m}</text>
      ))}
      {LINE_DATA.map(series => {
        const pts = series.values.map((v, i) => `${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(' ')
        return (
          <g key={series.label}>
            <polyline points={pts} fill="none" stroke={series.color} strokeWidth="2.5"
              strokeLinejoin="round" strokeLinecap="round" />
            {series.values.map((v, i) => (
              <circle key={i} cx={xs(i)} cy={ys(v)} r="4.5" fill={series.color} />
            ))}
          </g>
        )
      })}
      {LINE_DATA.map((s, i) => (
        <g key={s.label} transform={`translate(${ml + i * 110}, ${H - 12})`}>
          <rect x="0" y="-5" width="16" height="3" rx="1.5" fill={s.color} />
          <text x="22" y="0" fontSize="11" fontWeight="600" fill="#082C48">{s.label}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Donut chart ──────────────────────────────────────────────────
const DONUT_DATA_LIGHT = [
  { label: 'Product',  pct: 0.35, color: t['dark-blue'] },
  { label: 'Services', pct: 0.22, color: t['primary-orange'] },
  { label: 'Support',  pct: 0.18, color: '#458FCE' },
  { label: 'Growth',   pct: 0.13, color: '#9D9152' },
  { label: 'Other',    pct: 0.12, color: '#FFC099' },
]

const DONUT_DATA_DARK = [
  { label: 'Product',  pct: 0.35, color: t['pale-blue'] },
  { label: 'Services', pct: 0.22, color: t['primary-orange'] },
  { label: 'Support',  pct: 0.18, color: '#458FCE' },
  { label: 'Growth',   pct: 0.13, color: '#9D9152' },
  { label: 'Other',    pct: 0.12, color: t['white'] },
]

interface DonutDatum { label: string; pct: number; color: string }

function DonutChart({ data, dark = false }: { data: DonutDatum[]; dark?: boolean }) {
  const size = 200, cx = 100, cy = 100, r = 86, ir = 48
  let cum = 0
  const segs = data.map(d => {
    const start = cum; cum += d.pct
    return { ...d, path: donutSegment(cx, cy, r, ir, start, d.pct) }
  })

  const centerLabelColor = dark ? 'rgba(255,255,255,0.6)' : '#082C48'
  const centerValueColor = dark ? '#FFFFFF' : '#082C48'
  const legendTextColor  = dark ? 'rgba(255,255,255,0.9)' : '#082C48'
  const legendPctColor   = dark ? 'rgba(255,255,255,0.55)' : '#082C48'

  return (
    <div className="donut-chart-row">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%"
        style={{ display: "block", maxWidth: size, flexShrink: 0, fontFamily: "'Saans', sans-serif" }}>
        {segs.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize="10"
          fill={centerLabelColor} fontFamily="Saans, sans-serif">Total</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="20" fontWeight="700"
          fill={centerValueColor} fontFamily="Saans, sans-serif">100%</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, background: d.color, borderRadius: 2,
              flexShrink: 0,
              ...(d.color === t['white'] ? { outline: '1px solid rgba(255,255,255,0.35)' } : {}) }} />
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 13, color: legendTextColor }}>
              {d.label}
              <span style={{ color: legendPctColor, marginLeft: 10, fontWeight: 600 }}>
                {Math.round(d.pct * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Style spec row ───────────────────────────────────────────────
function SpecRow({ label, spec }: { label: string; spec: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr",
      borderBottom: "1px solid #E5E5E5", padding: "13px 0" }}>
      <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
        fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", paddingTop: 1 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 13, color: "#333",
        lineHeight: 1.5 }}>{spec}</div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────
export default function DataVizCharts() {
  return (
    <div className="page">
      <div className="section-label">Data visualisation</div>
      <h2 className="section-title">Chart guidelines</h2>
      <p className="section-intro">
        All charts and data graphics must follow these structural and stylistic standards.
        Consistent axes, typography, and color usage reinforce brand recognition at scale.
      </p>

      {/* Bar chart — light + dark */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 15,
            color: "#111" }}>Bar chart</div>
          <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Multi-category</div>
        </div>
        <div className="chart-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#111",
              marginBottom: 8 }}>On light</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "24px 20px", background: '#FCFCF4' }}>
              <BarChart data={BAR_DATA_LIGHT} />
            </div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
              marginTop: 8, lineHeight: 1.5 }}>
              Q3: <span style={{ fontFamily: "monospace", background: "#F3F3F3",
                padding: "1px 5px", borderRadius: 2 }}>#458FCE</span>; Q4: <span style={{ fontFamily: "monospace", background: "#F3F3F3",
                padding: "1px 5px", borderRadius: 2 }}>#9D9152</span>; Q5: <span style={{ fontFamily: "monospace", background: "#F3F3F3",
                padding: "1px 5px", borderRadius: 2 }}>#441109</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#111",
              marginBottom: 8 }}>On dark</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "24px 20px",
              background: t['dark-blue'] }}>
              <BarChart data={BAR_DATA_DARK} dark />
            </div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
              marginTop: 8, lineHeight: 1.5 }}>
              Q3: <span style={{ fontFamily: "monospace", background: "#F3F3F3",
                padding: "1px 5px", borderRadius: 2 }}>#458FCE</span>; Q4: <span style={{ fontFamily: "monospace", background: "#F3F3F3",
                padding: "1px 5px", borderRadius: 2 }}>#9D9152</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 15,
            color: "#111" }}>Line chart</div>
          <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Time series</div>
        </div>
        <div className="line-chart-box" style={{ border: "1px solid #E5E5E5", padding: "32px 24px" }}>
          <LineChart />
        </div>
      </div>

      {/* Donut chart — light + dark */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 15,
            color: "#111" }}>Donut chart</div>
          <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Part-to-whole</div>
        </div>
        <div className="chart-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#111",
              marginBottom: 8 }}>On light</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "32px 24px", background: '#FCFCF4' }}>
              <DonutChart data={DONUT_DATA_LIGHT} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#111",
              marginBottom: 8 }}>On dark</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "32px 24px",
              background: t['dark-blue'] }}>
              <DonutChart data={DONUT_DATA_DARK} dark />
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Saans', sans-serif", fontSize: 11, color: "#111",
          marginTop: 8, lineHeight: 1.5 }}>
          Support: #458FCE on both. Growth: #9D9152 on both. Other: #FFC099 on light, White on dark.
        </div>
      </div>

      {/* Style spec */}
      <div className="content-block">
        <h3 style={{ fontFamily: "'Saans', sans-serif", fontWeight: 500, fontSize: 17,
          margin: '0 0 4px', color: '#111' }}>Chart style specifications</h3>
        <div style={{ marginTop: 4, borderTop: "1px solid #E5E5E5" }}>
          <SpecRow label="Gridlines" spec="0.5px, horizontal only. rgba(8,44,72,0.15) on light, rgba(255,255,255,0.12) on dark. Dashed on line charts, solid on bar charts." />
          <SpecRow label="Background" spec="#FCFCF4 on light, Dark Blue (#082C48) on dark." />
          <SpecRow label="Axis labels" spec="Saans 8–9px / semibold (600) / #082C48 on light, 75% white on dark. Always outside the plot area." />
          <SpecRow label="Value labels" spec="Saans 8px / semibold (600) / #082C48 on light, 90% white on dark. Optional, above bars." />
          <SpecRow label="Legend" spec="Saans 11px / semibold (600) / #082C48. Below chart, horizontal. 16×3px rounded color swatch." />
          <SpecRow label="Bar corners" spec="No border radius. Square ends only." />
          <SpecRow label="Chart title" spec="Saans 15px / semibold (600) / #111, above chart, left-aligned." />
          <SpecRow label="Chart subtitle" spec="Saans 11px / uppercase / #111, immediately right of title, left-aligned." />
          <SpecRow label="Dot size (line)" spec="radius 4.5px, filled with the series color." />
          <SpecRow label="Stroke weight" spec="2.5px for line series. 0.5px for axis and grid lines." />
        </div>
      </div>
    </div>
  )
}
