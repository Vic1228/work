//* 女生
export class SchoolGirl {
  public name: string

  constructor(name: string) {
    this.name = name
  }
}

//* 追求者
class Pursuit {
  public mm: SchoolGirl

  constructor(mm: SchoolGirl) {
    this.mm = mm
  }

  public giveDolls(): void {
    console.log(this.mm.name + '送你洋娃娃')
  }

  public giveFlowers(): void {
    console.log(this.mm.name + '送你狗')
  }

  public givePig(): void {
    console.log(this.mm.name + '送你豬')
  }
}

//* 代理者
export class Proxy {
  public gg: Pursuit

  constructor(mm: SchoolGirl) {
    this.gg = new Pursuit(mm)
  }

  public giveDolls(): void {
    this.gg.giveDolls()
  }

  public giveFlowers(): void {
    this.gg.giveFlowers()
  }

  public givePig(): void {
    this.gg.givePig()
  }
}
