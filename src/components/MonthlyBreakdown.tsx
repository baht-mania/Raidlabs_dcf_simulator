'use client';

import { YearData } from '@/lib/types';
import { MONTHS, YEARS } from '@/lib/constants';
import { fmt, fmtMan } from '@/lib/formatters';

interface MonthlyBreakdownProps {
  yearlyData: YearData[];
  activeYear: number;
  onYearChange: (year: number) => void;
}

export default function MonthlyBreakdown({ yearlyData, activeYear, onYearChange }: MonthlyBreakdownProps) {
  const yi = activeYear - 2026;
  const yd = yearlyData[yi];
  const totalAnnual = yd.annualRev || 1;
  const dash = <span style={{ color: 'var(--text-ghost)' }}>—</span>;

  return (
    <div className="animate" style={{ gridColumn: '1 / -1', marginTop: 4, animationDelay: '0.3s' }}>
      {/* Year Tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => onYearChange(y)}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border)',
              borderBottom: y === activeYear ? 'none' : '1px solid var(--border)',
              borderRadius: '10px 10px 0 0',
              background: y === activeYear ? 'var(--panel)' : 'transparent',
              color: y === activeYear ? 'var(--accent-light)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: y === activeYear ? 'relative' : 'static',
              zIndex: y === activeYear ? 2 : 1,
            }}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        style={{
          background: 'var(--panel)',
          borderRadius: '0 16px 16px 16px',
          marginTop: -1,
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            월별 매출 / 비용 상세
          </span>
          <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', marginRight: 6, verticalAlign: 'middle' }} />
              NFT 마켓플레이스
            </span>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', marginRight: 6, verticalAlign: 'middle' }} />
              게임퍼블리싱
            </span>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)', marginRight: 6, verticalAlign: 'middle' }} />
              아이템거래
            </span>
          </div>
        </div>

        {/* Stream Bar */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 24, marginBottom: 8 }}>
            <div
              style={{
                width: `${(yd.annualNft / totalAnnual) * 100}%`,
                background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                minWidth: 30,
                transition: 'width 0.3s ease',
              }}
            >
              {yd.annualNft > 0 ? fmtMan(yd.annualNft) : ''}
            </div>
            <div
              style={{
                width: `${(yd.annualGame / totalAnnual) * 100}%`,
                background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                minWidth: 30,
                transition: 'width 0.3s ease',
              }}
            >
              {yd.annualGame > 0 ? fmtMan(yd.annualGame) : ''}
            </div>
            <div
              style={{
                width: `${(yd.annualItem / totalAnnual) * 100}%`,
                background: 'linear-gradient(90deg, #db2777, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                minWidth: 30,
                transition: 'width 0.3s ease',
              }}
            >
              {yd.annualItem > 0 ? fmtMan(yd.annualItem) : ''}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-faint)', marginBottom: 8 }}>
            <span>연간 매출: {fmtMan(yd.annualRev)}</span>
            <span>영업이익: {fmtMan(yd.annualProfit)}</span>
          </div>
        </div>

        {/* Monthly Table */}
        <div className="table-wrap" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>월</th>
                <th>NFT 마켓</th>
                <th>게임퍼블리싱</th>
                <th>아이템거래</th>
                <th>총 매출</th>
                <th>영업비용</th>
                <th>영업이익</th>
                <th>이익률</th>
              </tr>
            </thead>
            <tbody>
              {yd.months.map((m, i) => (
                <tr key={m.month}>
                  <td style={{ textAlign: 'left', color: 'var(--text-dim)', fontWeight: 600 }}>{MONTHS[i]}</td>
                  <td style={{ color: 'var(--cyan)' }}>{m.nft > 0 ? fmt(m.nft, 0) : dash}</td>
                  <td style={{ color: 'var(--amber)' }}>{m.game > 0 ? fmt(m.game, 0) : dash}</td>
                  <td style={{ color: 'var(--pink)' }}>{m.item > 0 ? fmt(m.item, 0) : dash}</td>
                  <td style={{ color: 'var(--text)', fontWeight: 700 }}>{m.totalRev > 0 ? fmt(m.totalRev, 0) : '—'}</td>
                  <td style={{ color: 'var(--red)', opacity: 0.8 }}>{m.opCost > 0 ? '-' + fmt(m.opCost, 0) : '—'}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>{m.opProfit > 0 ? fmt(m.opProfit, 0) : '—'}</td>
                  <td style={{ color: m.opMarginPct > 0 ? 'var(--text-dim)' : 'var(--text-ghost)' }}>
                    {m.opMarginPct > 0 ? fmt(m.opMarginPct, 0) + '%' : '—'}
                  </td>
                </tr>
              ))}
              {/* Annual Total Row */}
              <tr
                style={{
                  background: 'rgba(99,102,241,0.06)',
                  borderTop: '1px solid var(--accent-dark)',
                }}
              >
                <td style={{ textAlign: 'left', color: 'var(--accent-light)', fontWeight: 700, padding: '11px 10px' }}>합계</td>
                <td style={{ color: 'var(--cyan)', fontWeight: 700, padding: '11px 10px' }}>{fmt(yd.annualNft, 0)}</td>
                <td style={{ color: 'var(--amber)', fontWeight: 700, padding: '11px 10px' }}>{fmt(yd.annualGame, 0)}</td>
                <td style={{ color: 'var(--pink)', fontWeight: 700, padding: '11px 10px' }}>{fmt(yd.annualItem, 0)}</td>
                <td style={{ color: 'var(--text)', fontWeight: 700, padding: '11px 10px' }}>{fmt(yd.annualRev, 0)}</td>
                <td style={{ color: 'var(--red)', fontWeight: 700, padding: '11px 10px' }}>-{fmt(yd.annualCost, 0)}</td>
                <td style={{ color: 'var(--green)', fontWeight: 700, padding: '11px 10px' }}>{fmt(yd.annualProfit, 0)}</td>
                <td style={{ color: 'var(--accent-light)', fontWeight: 700, padding: '11px 10px' }}>
                  {yd.annualRev > 0 ? fmt((yd.annualProfit / yd.annualRev) * 100, 0) + '%' : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-ghost)', padding: '8px 20px', textAlign: 'right' }}>단위: 만원</div>
      </div>
    </div>
  );
}
