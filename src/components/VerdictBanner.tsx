'use client';

import { DCFResult, DCFParams } from '@/lib/types';
import { fmt } from '@/lib/formatters';

interface VerdictBannerProps {
  result: DCFResult;
  purchasePrice: number;
}

export default function VerdictBanner({ result, purchasePrice }: VerdictBannerProps) {
  const { isUndervalued, enterpriseValue, premium } = result;
  const color = isUndervalued ? 'var(--green)' : 'var(--red)';
  const bgGradient = isUndervalued
    ? 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.02) 100%)';
  const borderColor = isUndervalued ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)';

  return (
    <div
      className="animate"
      style={{
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        background: bgGradient,
        border: `1px solid ${borderColor}`,
        animationDelay: '0.05s',
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color }}>
          &#10022; {isUndervalued ? '저평가 (UNDERVALUED)' : '고평가 (OVERVALUED)'}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>
          DCF 적정가치{' '}
          <span style={{ color: 'var(--text)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {fmt(enterpriseValue, 1)}억원
          </span>{' '}
          vs 매수가{' '}
          <span style={{ color: 'var(--text)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {purchasePrice}억원
          </span>
        </div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-mono)', color }}>
        {premium > 0 ? '+' : ''}{fmt(premium, 1)}%
      </div>
    </div>
  );
}
