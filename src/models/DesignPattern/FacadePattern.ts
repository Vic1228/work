//* 基金物件(其中有股票1、2、3)
class Fund {
  private static instance: Fund
  private stock1: Stock1
  private stock2: Stock2
  private stock3: Stock3

  private constructor() {
    this.stock1 = new Stock1()
    this.stock2 = new Stock2()
    this.stock3 = new Stock3()
  }

  public static getInstance(): Fund {
    if (!Fund.instance) {
      Fund.instance = new Fund()
    }
    return Fund.instance
  }

  public buyFund(): string {
    this.stock1.buy()
    this.stock2.buy()
    this.stock3.buy()
    return '基金組合買入成功'
  }

  public sellFund(): string {
    this.stock1.sell()
    this.stock2.sell()
    this.stock3.sell()
    return '基金組合賣出成功'
  }
}

class Stock1 {
  public buy(): void {
    console.log('買入股票1')
  }

  public sell(): void {
    console.log('賣出股票1')
  }
}

class Stock2 {
  public buy(): void {
    console.log('買入股票2')
  }

  public sell(): void {
    console.log('賣出股票2')
  }
}

class Stock3 {
  public buy(): void {
    console.log('買入股票3')
  }

  public sell(): void {
    console.log('賣出股票3')
  }
}

//* 股票交易程式
export class StockTradingProgram {
  private fund: Fund

  constructor() {
    this.fund = Fund.getInstance()
  }

  public buy(): string {
    return this.fund.buyFund()
  }

  public sell(): string {
    return this.fund.sellFund()
  }
}

/*
06/03修改:
1. Fund參考獨體模式來修改，避免在StockTradingProgram中每次都重新new一次fund的物件
2. Fund不在回傳執行的細節，而是只回傳重點訊息
*/
