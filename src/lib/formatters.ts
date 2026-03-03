export function fmt(n: number, decimals: number = 2): string {
  if (Math.abs(n) < 0.0001) return (0).toFixed(decimals);
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function fmtMan(n: number): string {
  if (n >= 10000) return fmt(n / 10000, 1) + '억';
  return fmt(n, 0) + '만';
}

export function fmtSliderValue(value: number, unit: '만원' | '억원' | '%' | '월'): string {
  if (unit === '만원') return fmtMan(value);
  if (unit === '억원') return fmt(value, 1) + '억원';
  if (unit === '월') return value + '월';
  return value + '%';
}

export function fmtSliderMin(min: number, unit: '만원' | '억원' | '%' | '월'): string {
  if (unit === '만원') return min + '만';
  return min + unit;
}

export function fmtSliderMax(max: number, unit: '만원' | '억원' | '%' | '월'): string {
  if (unit === '만원') {
    if (max >= 10000) return (max / 10000) + '억';
    return max + '만';
  }
  return max + unit;
}
