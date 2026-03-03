'use client';

import { useCallback, useRef, useEffect } from 'react';
import { SliderConfig } from '@/lib/types';
import { fmtSliderValue, fmtSliderMin, fmtSliderMax } from '@/lib/formatters';

interface SliderProps {
  sliderKey: string;
  config: SliderConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function Slider({ sliderKey, config, value, onChange }: SliderProps) {
  const rangeRef = useRef<HTMLInputElement>(null);

  const updateBackground = useCallback((el: HTMLInputElement) => {
    const pct = ((Number(el.value) - config.min) / (config.max - config.min)) * 100;
    el.style.background = `linear-gradient(90deg, var(--accent) ${pct}%, var(--border) ${pct}%)`;
  }, [config.min, config.max]);

  useEffect(() => {
    if (rangeRef.current) updateBackground(rangeRef.current);
  }, [value, updateBackground]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
    updateBackground(e.target);
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: '#8a8f98', letterSpacing: '0.02em' }}>{config.label}</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            background: 'rgba(99,102,241,0.12)',
            padding: '2px 8px',
            borderRadius: 6,
          }}
        >
          {fmtSliderValue(value, config.unit)}
        </span>
      </div>
      <input
        ref={rangeRef}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={handleChange}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-faint)', marginTop: 1 }}>
        <span>{fmtSliderMin(config.min, config.unit)}</span>
        <span>{fmtSliderMax(config.max, config.unit)}</span>
      </div>
    </div>
  );
}
