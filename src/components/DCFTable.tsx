'use client';

import { DCFResult } from '@/lib/types';
import { fmt } from '@/lib/formatters';

interface DCFTableProps {
  result: DCFResult;
}

export default function DCFTable({ result }: DCFTableProps) {
  return (
    <div
      className="animate"
      style={{
        background: 'var(--panel)',
        borderRadius: 16,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        animationDelay: '0.2s',
      }}
    >
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          5개년 DCF 예측
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>단위: 억원</span>
      </div>
      <div className="table-wrap" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>연도</th>
              <th>매출</th>
              <th>EBIT</th>
              <th>NOPAT</th>
              <th>FCF</th>
              <th>할인계수</th>
              <th>PV(FCF)</th>
            </tr>
          </thead>
          <tbody>
            {result.years.map((y) => (
              <tr key={y.year}>
                <td style={{ color: 'var(--text-dim)', fontWeight: 700 }}>{y.year}</td>
                <td>{fmt(y.revenue, 1)}</td>
                <td>{fmt(y.ebit, 1)}</td>
                <td>{fmt(y.nopat, 1)}</td>
                <td style={{ color: 'var(--green)' }}>{fmt(y.fcf, 1)}</td>
                <td style={{ color: 'var(--text-muted)' }}>{fmt(y.discountFactor, 3)}</td>
                <td style={{ color: 'var(--accent-light)', fontWeight: 700 }}>{fmt(y.pvFCF, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
