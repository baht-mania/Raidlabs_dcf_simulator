import { StreamParams, DCFParams, MonthData, YearData, DCFYearResult, DCFResult } from './types';

export function calcMonthlyData(streams: StreamParams, dcfParams: DCFParams): YearData[] {
  const growth = dcfParams.revenueGrowth / 100;
  const margin = dcfParams.operatingMargin / 100;
  const allYears: YearData[] = [];

  for (let yi = 0; yi < 5; yi++) {
    const year = 2026 + yi;
    const months: MonthData[] = [];

    for (let mi = 0; mi < 12; mi++) {
      const mon = mi + 1;
      let nft = 0, game = 0, item = 0;

      if (yi === 0) {
        nft = mon >= streams.nftStart ? streams.nftMonthly : 0;
        game = mon >= streams.gameStart ? streams.gameMonthly : 0;
        item = mon >= streams.itemStart ? streams.itemMonthly : 0;
      } else {
        nft = streams.nftMonthly * Math.pow(1 + growth, yi);
        game = streams.gameMonthly * Math.pow(1 + growth, yi);
        item = streams.itemMonthly * Math.pow(1 + growth, yi);
      }

      const totalRev = nft + game + item;
      const opCost = totalRev * (1 - margin);
      const opProfit = totalRev * margin;
      const opMarginPct = totalRev > 0 ? (opProfit / totalRev) * 100 : 0;

      months.push({ month: mon, nft, game, item, totalRev, opCost, opProfit, opMarginPct });
    }

    let annualRev = 0, annualCost = 0, annualProfit = 0;
    let annualNft = 0, annualGame = 0, annualItem = 0;
    months.forEach(m => {
      annualRev += m.totalRev;
      annualCost += m.opCost;
      annualProfit += m.opProfit;
      annualNft += m.nft;
      annualGame += m.game;
      annualItem += m.item;
    });

    allYears.push({ year, months, annualRev, annualCost, annualProfit, annualNft, annualGame, annualItem });
  }

  return allYears;
}

export function computeDCF(yearlyData: YearData[], dcf: DCFParams): DCFResult {
  const years: DCFYearResult[] = [];
  let totalPVFCF = 0;

  for (let i = 0; i < 5; i++) {
    const revenue = yearlyData[i].annualRev / 10000;
    const ebit = revenue * (dcf.operatingMargin / 100);
    const nopat = ebit * (1 - dcf.taxRate / 100);
    const fcf = nopat;
    const discountFactor = Math.pow(1 + dcf.wacc / 100, i + 1);
    const pvFCF = fcf / discountFactor;
    totalPVFCF += pvFCF;

    years.push({ year: 2026 + i, revenue, ebit, nopat, fcf, discountFactor, pvFCF });
  }

  const lastFCF = years[4].fcf;
  const terminalValue = (lastFCF * (1 + dcf.terminalGrowth / 100)) / (dcf.wacc / 100 - dcf.terminalGrowth / 100);
  const pvTerminal = terminalValue / Math.pow(1 + dcf.wacc / 100, 5);
  const enterpriseValue = totalPVFCF + pvTerminal;
  const premium = ((enterpriseValue - dcf.purchasePrice) / dcf.purchasePrice) * 100;
  const isUndervalued = enterpriseValue > dcf.purchasePrice;

  return { years, totalPVFCF, terminalValue, pvTerminal, enterpriseValue, premium, isUndervalued };
}
