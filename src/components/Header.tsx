export default function Header() {
  return (
    <div className="animate" style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
        Discounted Cash Flow Analysis
      </div>
      <h1 style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #e8eaed 0%, #9ca3af 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Raid Labs DCF Valuation Simulator
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>
        33 억원 매수가 기준 | 5개년 월별 매출/비용 예측
      </p>
    </div>
  );
}
