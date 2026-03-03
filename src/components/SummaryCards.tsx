'use client';

import { DCFResult, YearData } from '@/lib/types';
import { fmt, fmtMan } from '@/lib/formatters';

interface SummaryCardsProps {
  result: DCFResult;
  yearData: YearData;
}

export default function SummaryCards({ result, yearData }: SummaryCardsProps) {
  const cards = [
    {
      label: '2026년 매출',
      value: fmt(result.years[0].revenue, 1) + '억',
      sub: '월평균 ' + fmtMan(yearData.annualRev / 12),
      highlight: false,
    },
    {
      label: '5년 FCF 현재가치',
      value: fmt(result.totalPVFCF, 1) + '억',
      sub: 'PV of FCFs',
      highlight: false,
    },
    {
      label: '기업가치 (EV)',
      value: fmt(result.enterpriseValue, 1) + '억',
      sub: 'TV PV: ' + fmt(result.pvTerminal, 1) + '억',
      highlight: true,
    },
  ];

  return (
    <div
      className="animate"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 20,
        animationDelay: '0.15s',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: card.highlight
              ? 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)'
              : 'var(--panel)',
            border: `1px solid ${card.highlight ? 'rgba(99,102,241,0.3)' : 'var(--border)'}`,
            borderRadius: 14,
            padding: '16px 14px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.02em' }}>
            {card.label}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: card.highlight ? 'var(--accent-light)' : 'var(--text)',
            }}
          >
            {card.value}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
