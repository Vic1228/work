//* 南丁格爾(抽象志工)
abstract class Nightingale {
  public sweep(): void {
    console.log('掃地')
  }
  public wash(): void {
    console.log('洗衣')
  }
  public sleep(): void {
    console.log('睡覺')
  }
}
//* 大學生
class Undergraduate extends Nightingale {
  public wash(): void {
    console.log('特殊洗衣')
  }
}
//* 義工
class Volunteer extends Nightingale {}

//* 抽象工廠類別
abstract class NightingaleFactory {
  abstract createNightingale(): Nightingale
}
//* 大學生工廠類別
class UndergraduateFactory extends NightingaleFactory {
  createNightingale(): Nightingale {
    return new Undergraduate()
  }
}
const undergraduateFactory = new UndergraduateFactory()
//* 義工工廠類別
class VolunteerFactory extends NightingaleFactory {
  createNightingale(): Nightingale {
    return new Volunteer()
  }
}
const volunteerFactory = new VolunteerFactory()

//* 工廠管理者
export class FactoryManager {
  private static factoryObject: { [key: string]: NightingaleFactory } = {
    undergraduateFactory: undergraduateFactory,
    volunteerFactory: volunteerFactory
  }

  static getFactory(factoryName: string): NightingaleFactory | undefined {
    if (factoryName in this.factoryObject) {
      return this.factoryObject[factoryName]
    } else {
      return undefined
    }
  }
}
