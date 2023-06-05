//* 抽象手機軟體物件
abstract class HandsetSoft {
  abstract Run(): void
}

//* 抽象手機品牌物件
abstract class HandsetBrand {
  public soft: HandsetSoft

  constructor(soft?: HandsetSoft) {
    this.soft = soft || new HandsetAddressList()
  }

  public SetHandsetSoft(soft: HandsetSoft): void {
    this.soft = soft
  }
}

//* 實體手機軟體
export class HandsetGame extends HandsetSoft {
  public Run(): void {
    console.log('執行手機遊戲')
  }
}
export class HandsetAddressList extends HandsetSoft {
  public Run(): void {
    console.log('執行手機通訊錄')
  }
}

//* 實體手機
export class HandsetBrandN extends HandsetBrand {
  constructor(soft?: HandsetSoft) {
    super(soft)
  }

  public Run(): void {
    this.soft.Run()
  }
}
export class HandsetBrandM extends HandsetBrand {
  constructor(soft?: HandsetSoft) {
    super(soft)
  }

  public Run(): void {
    this.soft.Run()
  }
}
