import { SliderConfig, StreamParams, DCFParams } from './types';

export const STREAM_SLIDER_CONFIGS: Record<keyof StreamParams, SliderConfig> = {
  nftMonthly: { label: '월 매출', value: 3000, min: 0, max: 10000, step: 100, unit: '만원' },
  nftStart: { label: '시작월 (2026)', value: 1, min: 1, max: 12, step: 1, unit: '월' },
  gameMonthly: { label: '월 평균 매출', value: 14000, min: 0, max: 50000, step: 500, unit: '만원' },
  gameStart: { label: '시작월 (2026)', value: 3, min: 1, max: 12, step: 1, unit: '월' },
  itemMonthly: { label: '월 매출', value: 3000, min: 0, max: 10000, step: 100, unit: '만원' },
  itemStart: { label: '시작월 (2026)', value: 5, min: 1, max: 12, step: 1, unit: '월' },
};

export const DCF_SLIDER_CONFIGS: Record<keyof DCFParams, SliderConfig> = {
  revenueGrowth: { label: '매출 성장률 (YoY)', value: 20, min: 0, max: 80, step: 1, unit: '%' },
  operatingMargin: { label: '영업이익률', value: 25, min: 5, max: 50, step: 1, unit: '%' },
  wacc: { label: 'WACC (할인율)', value: 20, min: 5, max: 40, step: 1, unit: '%' },
  terminalGrowth: { label: '영구성장률', value: 2, min: 0, max: 5, step: 0.5, unit: '%' },
  capexRate: { label: 'Capex (매출대비)', value: 15, min: 0, max: 30, step: 1, unit: '%' },
  taxRate: { label: '법인세율', value: 22, min: 0, max: 35, step: 1, unit: '%' },
  purchasePrice: { label: '매수가', value: 33, min: 10, max: 100, step: 0.5, unit: '억원' },
};

export const DEFAULT_STREAM_PARAMS: StreamParams = {
  nftMonthly: 3000,
  nftStart: 1,
  gameMonthly: 14000,
  gameStart: 3,
  itemMonthly: 3000,
  itemStart: 5,
};

export const DEFAULT_DCF_PARAMS: DCFParams = {
  revenueGrowth: 20,
  operatingMargin: 25,
  wacc: 20,
  terminalGrowth: 2,
  capexRate: 15,
  taxRate: 22,
  purchasePrice: 33,
};

export const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
export const YEARS = [2026, 2027, 2028, 2029, 2030];
