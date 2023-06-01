//* 抽象觀察者
abstract class Observer {
  abstract index: number
  abstract update(name: string): void
}

//* 抽象通知者
abstract class Subject {
  public observers: Observer[] = []

  public add(observer: Observer): void {
    this.observers.push(observer)
  }

  public remove(index: number): void {
    this.observers.splice(index, 1)
  }

  public notify(name: string): void {
    for (const observer of this.observers) {
      observer.update(name)
    }
  }
}

//* 實體通知者
export class Boss extends Subject {
  private name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public getList(): Observer[] {
    return this.observers
  }
}

//* 股票員工
export class StockObserver extends Observer {
  private name: string
  private bossName: string
  public index: number

  constructor(name: string, bossName: string) {
    super()
    this.index = 0
    this.name = name
    this.bossName = bossName
  }

  update(name: string): void {
    console.log(this.bossName + '回來了！' + name + '  ' + this.name + ' : 關閉股票平台 繼續上班')
  }
}
