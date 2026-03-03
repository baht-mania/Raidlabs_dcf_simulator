'use client';

import { useState, useMemo, useCallback } from 'react';
import { StreamParams, DCFParams } from '@/lib/types';
import { DEFAULT_STREAM_PARAMS, DEFAULT_DCF_PARAMS } from '@/lib/constants';
import { calcMonthlyData, computeDCF } from '@/lib/calculations';
import Header from '@/components/Header';
import VerdictBanner from '@/components/VerdictBanner';
import ControlPanel from '@/components/ControlPanel';
import SummaryCards from '@/components/SummaryCards';
import DCFTable from '@/components/DCFTable';
import ValueComposition from '@/components/ValueComposition';
import Assumptions from '@/components/Assumptions';
import MonthlyBreakdown from '@/components/MonthlyBreakdown';

export default function Home() {
  const [streams, setStreams] = useState<StreamParams>({ ...DEFAULT_STREAM_PARAMS });
  const [dcfParams, setDCFParams] = useState<DCFParams>({ ...DEFAULT_DCF_PARAMS });
  const [activeYear, setActiveYear] = useState(2026);

  const yearlyData = useMemo(() => calcMonthlyData(streams, dcfParams), [streams, dcfParams]);
  const dcfResult = useMemo(() => computeDCF(yearlyData, dcfParams), [yearlyData, dcfParams]);

  const handleStreamChange = useCallback((key: keyof StreamParams, value: number) => {
    setStreams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDCFChange = useCallback((key: keyof DCFParams, value: number) => {
    setDCFParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setStreams({ ...DEFAULT_STREAM_PARAMS });
    setDCFParams({ ...DEFAULT_DCF_PARAMS });
    setActiveYear(2026);
  }, []);

  return (
    <div style={{ padding: '24px 16px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Header />
        <VerdictBanner result={dcfResult} purchasePrice={dcfParams.purchasePrice} />

        <div className="main-grid">
          {/* Left: Control Panel */}
          <ControlPanel
            streams={streams}
            dcfParams={dcfParams}
            onStreamChange={handleStreamChange}
            onDCFChange={handleDCFChange}
            onReset={handleReset}
          />

          {/* Right: Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SummaryCards result={dcfResult} yearData={yearlyData[0]} />
            <DCFTable result={dcfResult} />
            <ValueComposition result={dcfResult} purchasePrice={dcfParams.purchasePrice} />
            <Assumptions dcfParams={dcfParams} />
          </div>

          {/* Full Width: Monthly Breakdown */}
          <MonthlyBreakdown
            yearlyData={yearlyData}
            activeYear={activeYear}
            onYearChange={setActiveYear}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: 'var(--text-ghost)' }}>
          DCF Valuation Model | 슬라이더로 가정값을 변경하면 실시간으로 기업가치가 재계산됩니다
        </div>
      </div>
    </div>
  );
}
