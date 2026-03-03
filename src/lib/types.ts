export interface StreamParams {
  nftMonthly: number;
  nftStart: number;
  gameMonthly: number;
  gameStart: number;
  itemMonthly: number;
  itemStart: number;
}

export interface DCFParams {
  revenueGrowth: number;
  operatingMargin: number;
  wacc: number;
  terminalGrowth: number;
  capexRate: number;
  taxRate: number;
  purchasePrice: number;
}

export interface SliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: '만원' | '억원' | '%' | '월';
}

export interface MonthData {
  month: number;
  nft: number;
  game: number;
  item: number;
  totalRev: number;
  opCost: number;
  opProfit: number;
  opMarginPct: number;
}

export interface YearData {
  year: number;
  months: MonthData[];
  annualRev: number;
  annualCost: number;
  annualProfit: number;
  annualNft: number;
  annualGame: number;
  annualItem: number;
}

export interface DCFYearResult {
  year: number;
  revenue: number;
  ebit: number;
  nopat: number;
  fcf: number;
  discountFactor: number;
  pvFCF: number;
}

export interface DCFResult {
  years: DCFYearResult[];
  totalPVFCF: number;
  terminalValue: number;
  pvTerminal: number;
  enterpriseValue: number;
  premium: number;
  isUndervalued: boolean;
}
