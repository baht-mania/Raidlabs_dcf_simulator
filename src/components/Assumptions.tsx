'use client';

import { DCFParams } from '@/lib/types';

interface AssumptionsProps {
  dcfParams: DCFParams;
}

export default function Assumptions({ dcfParams }: AssumptionsProps) {
  const items = [
    { label: '매출 성장률', value: dcfParams.revenueGrowth + '%' },
    { label: '영업이익률', value: dcfParams.operatingMargin + '%' },
    { label: 'WACC', value: dcfParams.wacc + '%' },
    { label: '영구성장률', value: dcfParams.terminalGrowth + '%' },
    { label: 'Capex/매출', value: dcfParams.capexRate + '%' },
    { label: '법인세율', value: dcfParams.taxRate + '%' },
    { label: 'D&A', value: '≈ Capex' },
    { label: '운전자본변동', value: '무시' },
  ];

  return (
    <div
      className="animate"
      style={{
        background: 'var(--panel)',
        borderRadius: 16,
        padding: 20,
        border: '1px solid var(--border)',
        animationDelay: '0.25s',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {items.map((item) => (
          <div key={item.label} style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
