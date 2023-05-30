class Fund {
  public stock1: Stock1
  public stock2: Stock2
  public stock3: Stock3

  constructor() {
    this.stock1 = new Stock1()
    this.stock2 = new Stock2()
    this.stock3 = new Stock3()
  }

  public buyFund(): string[] {
    return [this.stock1.buy(), this.stock2.buy(), this.stock3.buy()]
  }

  public sellFund(): string[] {
    return [this.stock1.sell(), this.stock2.sell(), this.stock3.sell()]
  }
}

class Stock1 {
  public buy(): string {
    return '買入股票1'
  }

  public sell(): string {
    return '賣出股票1'
  }
}

class Stock2 {
  public buy(): string {
    return '買入股票2'
  }

  public sell(): string {
    return '賣出股票2'
  }
}

class Stock3 {
  public buy(): string {
    return '買入股票3'
  }

  public sell(): string {
    return '賣出股票3'
  }
}

export class StockTradingProgram {
  public buy(): string[] {
    const fund: Fund = new Fund()
    return fund.buyFund()
  }
  public sell(): string[] {
    const fund: Fund = new Fund()
    return fund.sellFund()
  }
}
