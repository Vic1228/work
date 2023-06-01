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
//* 抽象工廠類別
abstract class NightingaleFactory {
  abstract createNightingale(): Nightingale
}

//* 大學生
class Undergraduate extends Nightingale {
  public wash(): void {
    console.log('特殊洗衣')
  }
}
//* 義工
class Volunteer extends Nightingale {}

//* 大學生工廠類別
export class UndergraduateFactory extends NightingaleFactory {
  createNightingale(): Nightingale {
    return new Undergraduate()
  }
}

//* 義工工廠類別
export class VolunteerFactory extends NightingaleFactory {
  createNightingale(): Nightingale {
    return new Volunteer()
  }
}
