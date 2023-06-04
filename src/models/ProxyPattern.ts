// 女孩
export class SchoolGirl {
  public name: string

  constructor(name: string) {
    this.name = name
  }
}

// 抽象追求者
abstract class Pursuer {
  abstract giveDolls(): void
  abstract giveFlowers(): void
  abstract givePig(): void
}

// 追求者
class RealPursuer extends Pursuer {
  public girl: SchoolGirl

  constructor(girl: SchoolGirl) {
    super()
    this.girl = girl
  }

  public giveDolls(): void {
    console.log(this.girl.name + '送你洋娃娃')
  }

  public giveFlowers(): void {
    console.log(this.girl.name + '送你花')
  }

  public givePig(): void {
    console.log(this.girl.name + '送你寵物')
  }
}

// 代理者
export class Proxy extends Pursuer {
  private man: Pursuer

  constructor(girl: SchoolGirl) {
    super()
    this.man = new RealPursuer(girl)
  }

  public giveDolls(): void {
    this.man.giveDolls()
  }

  public giveFlowers(): void {
    this.man.giveFlowers()
  }

  public givePig(): void {
    this.man.givePig()
  }
}
