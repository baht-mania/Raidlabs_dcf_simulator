'use client';

import { DCFResult } from '@/lib/types';
import { fmt } from '@/lib/formatters';

interface ValueCompositionProps {
  result: DCFResult;
  purchasePrice: number;
}

export default function ValueComposition({ result, purchasePrice }: ValueCompositionProps) {
  const { totalPVFCF, pvTerminal, enterpriseValue, isUndervalued } = result;
  const fcfPct = (totalPVFCF / enterpriseValue) * 100;
  const tvPct = (pvTerminal / enterpriseValue) * 100;
  const markerLeft = Math.min((purchasePrice / enterpriseValue) * 100, 98);
  const markerColor = isUndervalued ? 'var(--green)' : 'var(--red)';

  return (
    <div
      className="animate"
      style={{
        background: 'var(--panel)',
        borderRadius: 16,
        padding: 24,
        border: '1px solid var(--border)',
        animationDelay: '0.2s',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
        가치 구성
      </div>

      {/* Composition Bar */}
      <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 36, marginBottom: 12 }}>
        <div
          style={{
            width: `${fcfPct}%`,
            background: 'linear-gradient(90deg, #6366f1, #818cf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            minWidth: 60,
            transition: 'width 0.4s ease',
          }}
        >
          FCF {fmt(fcfPct, 0)}%
        </div>
        <div
          style={{
            width: `${tvPct}%`,
            background: 'linear-gradient(90deg, #4f46e5, #3730a3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#c7d2fe',
            minWidth: 60,
            transition: 'width 0.4s ease',
          }}
        >
          TV {fmt(tvPct, 0)}%
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
        <span>5년 FCF 현가: {fmt(totalPVFCF, 1)}억</span>
        <span>Terminal PV: {fmt(pvTerminal, 1)}억</span>
      </div>

      {/* Price Marker */}
      <div style={{ position: 'relative', marginTop: 20, height: 44 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            height: 32,
            borderRadius: 6,
            width: '100%',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${markerLeft}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateX(-50%)',
            transition: 'left 0.4s ease',
          }}
        >
          <div style={{ width: 2, height: 32, background: markerColor }} />
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2, whiteSpace: 'nowrap', color: markerColor }}>
            매수가 {purchasePrice}억
          </div>
        </div>
      </div>
    </div>
  );
}
