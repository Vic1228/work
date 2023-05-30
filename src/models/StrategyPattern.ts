//* 付款策略
abstract class pricingStrategy {
  abstract calculatePrice(quantity: number, unitPrice: number): number
}

//* 正常付費
class normalPricing extends pricingStrategy {
  calculatePrice(quantity: number, unitPrice: number): number {
    return quantity * unitPrice
  }
}

//* 打折收費
class percentageDiscount extends pricingStrategy {
  public discount: number // 定義變數 public公開 private私有(僅有此class可使用)

  // 這邊會接到new的時候帶入的參數
  constructor(discount: number) {
    super() // 初始化父類別
    this.discount = discount // 初始化子類的屬性
  }

  calculatePrice(quantity: number, unitPrice: number): number {
    const discountedPrice = unitPrice * this.discount
    return quantity * discountedPrice
  }
}

//* 紅利收費
class thresholdDiscount extends pricingStrategy {
  public threshold: number
  public discount: number

  constructor(threshold: number, discount: number) {
    super()
    this.threshold = threshold
    this.discount = discount
  }

  calculatePrice(quantity: number, unitPrice: number): number {
    if (quantity * unitPrice >= this.threshold) {
      return quantity * unitPrice - this.discount
    } else {
      return quantity * unitPrice
    }
  }
}

//* 簡單工廠
export class PricingStrategyFactory {
  public cs: pricingStrategy

  constructor(strategyType: string) {
    switch (strategyType) {
      case '正常收費':
        this.cs = new normalPricing()
        break
      case '打8折':
        this.cs = new percentageDiscount(0.8)
        break
      case '滿300送100':
        this.cs = new thresholdDiscount(300, 100)
        break
      default:
        throw new Error('錯誤~')
    }
  }

  getResult(num1: number, num2: number): number {
    return this.cs.calculatePrice(num1, num2)
  }
}
