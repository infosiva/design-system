// Labelled sample dashboard: shows what an account gives BEFORE sign-up. Never real user data.
import type { CSSProperties } from 'react'

export interface ExampleStat { label: string; value: string }
export interface ExampleDashboardProps {
  title?: string
  stats: ExampleStat[]
  /** 7 values 0-100, oldest first; drawn as bars (streak/progress). */
  series: number[]
  accent: string
  cta?: { label: string; href: string }
}

const wrap: CSSProperties = { background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }

export function ExampleDashboard({ title = 'Your dashboard', stats, series, accent, cta }: ExampleDashboardProps) {
  return (
    <section style={wrap} aria-label={`${title} (example data)`}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: 999 }}>Example data</span>
      </header>
      <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(96px,1fr))', gap: 8, margin: 0 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#f8fafc', borderRadius: 12, padding: '8px 10px' }}>
            <dt style={{ fontSize: 12, color: '#475569' }}>{s.label}</dt>
            <dd style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{s.value}</dd>
          </div>
        ))}
      </dl>
      <div role="img" aria-label="Example last 7 days" style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56, marginTop: 12 }}>
        {series.slice(-7).map((v, i) => (
          <span key={i} style={{ flex: 1, height: `${Math.max(6, Math.min(100, v))}%`, background: accent, borderRadius: 4, opacity: 0.35 + 0.65 * (i / 6) }} />
        ))}
      </div>
      {cta && <a href={cta.href} style={{ display: 'inline-block', marginTop: 12, minHeight: 44, lineHeight: '44px', padding: '0 16px', borderRadius: 12, background: accent, color: '#fff', fontWeight: 700, textDecoration: 'none' }}>{cta.label}</a>}
    </section>
  )
}
