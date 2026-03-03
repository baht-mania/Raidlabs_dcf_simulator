'use client';

import { StreamParams, DCFParams } from '@/lib/types';
import { STREAM_SLIDER_CONFIGS, DCF_SLIDER_CONFIGS } from '@/lib/constants';
import Slider from './Slider';

interface ControlPanelProps {
  streams: StreamParams;
  dcfParams: DCFParams;
  onStreamChange: (key: keyof StreamParams, value: number) => void;
  onDCFChange: (key: keyof DCFParams, value: number) => void;
  onReset: () => void;
}

export default function ControlPanel({ streams, dcfParams, onStreamChange, onDCFChange, onReset }: ControlPanelProps) {
  return (
    <div
      style={{
        background: 'var(--panel)',
        borderRadius: 16,
        padding: 24,
        border: '1px solid var(--border)',
        alignSelf: 'start',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
        매출 스트림
      </div>

      {/* NFT 마켓플레이스 */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, color: 'var(--cyan)' }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', marginRight: 6, verticalAlign: 'middle' }} />
        NFT 마켓플레이스 용역
      </div>
      <Slider sliderKey="nftMonthly" config={STREAM_SLIDER_CONFIGS.nftMonthly} value={streams.nftMonthly} onChange={(v) => onStreamChange('nftMonthly', v)} />
      <Slider sliderKey="nftStart" config={STREAM_SLIDER_CONFIGS.nftStart} value={streams.nftStart} onChange={(v) => onStreamChange('nftStart', v)} />

      {/* 게임퍼블리싱 */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, marginTop: 4, color: 'var(--amber)' }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', marginRight: 6, verticalAlign: 'middle' }} />
        게임퍼블리싱 운영대행
      </div>
      <Slider sliderKey="gameMonthly" config={STREAM_SLIDER_CONFIGS.gameMonthly} value={streams.gameMonthly} onChange={(v) => onStreamChange('gameMonthly', v)} />
      <Slider sliderKey="gameStart" config={STREAM_SLIDER_CONFIGS.gameStart} value={streams.gameStart} onChange={(v) => onStreamChange('gameStart', v)} />

      {/* 아이템거래 */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, marginTop: 4, color: 'var(--pink)' }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)', marginRight: 6, verticalAlign: 'middle' }} />
        아이템거래 플랫폼
      </div>
      <Slider sliderKey="itemMonthly" config={STREAM_SLIDER_CONFIGS.itemMonthly} value={streams.itemMonthly} onChange={(v) => onStreamChange('itemMonthly', v)} />
      <Slider sliderKey="itemStart" config={STREAM_SLIDER_CONFIGS.itemStart} value={streams.itemStart} onChange={(v) => onStreamChange('itemStart', v)} />

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />

      {/* DCF 가정 */}
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
        DCF 가정
      </div>
      {(Object.keys(DCF_SLIDER_CONFIGS) as (keyof DCFParams)[]).map((key) => (
        <Slider
          key={key}
          sliderKey={key}
          config={DCF_SLIDER_CONFIGS[key]}
          value={dcfParams[key]}
          onChange={(v) => onDCFChange(key, v)}
        />
      ))}

      {/* Reset Button */}
      <button
        onClick={onReset}
        style={{
          width: '100%',
          marginTop: 8,
          padding: '9px 0',
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: 'transparent',
          color: 'var(--text-muted)',
          fontSize: 12,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.color = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        기본값 초기화
      </button>
    </div>
  );
}
