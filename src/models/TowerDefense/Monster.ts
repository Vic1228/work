// 抽象怪物
export abstract class Monster {
  abstract speed: number
  abstract HP: number
}

// 具體的怪物類
class ConcreteMonster extends Monster {
  speed: number
  HP: number

  constructor(speed: number, HP: number) {
    super()
    this.speed = speed
    this.HP = HP
  }
}

// 怪物享元工廠
class MonsterFlyweightFactory {
  private monsters: { [key: string]: Monster } = {}

  createMonster(speed: number, HP: number): Monster {
    const key = `${speed}_${HP}`
    if (!this.monsters[key]) {
      this.monsters[key] = new ConcreteMonster(speed, HP)
    }
    return this.monsters[key]
  }
}

// 抽象觀察者接口
export abstract class MonsterObserver {
  abstract onMonsterCreated(monster: Monster, location: number): void // 怪物創建時觸發
  abstract onMonsterMoved(): void // 怪物移動時觸發
  abstract onMonsterExceededThreshold(): void // 怪物位置超過後觸發
  abstract onMonsterKilled(): void // 怪物被擊殺時通知
}

// 怪物生成器管理器
export class MonsterGenerator {
  private static instance: MonsterGenerator
  private observers: MonsterObserver[] = []
  private monsterFactory: MonsterFlyweightFactory
  private monsterList: { monster: Monster; location: number; nowHP: number }[] = []

  private constructor() {
    this.monsterFactory = new MonsterFlyweightFactory()
  }

  // 新增觀察怪物
  addObserver(observer: MonsterObserver): void {
    this.observers.push(observer)
  }

  // 刪除觀察怪物
  removeObserver(observer: MonsterObserver): void {
    const index = this.observers.indexOf(observer)
    if (index >= 0) {
      this.observers.splice(index, 1)
    }
  }

  // 建造怪物 / 調用怪物創建通知方法
  generateMonster({
    speed,
    HP,
    location,
    nowHP
  }: {
    speed: number
    HP: number
    location: number
    nowHP: number
  }): Monster {
    const monster = this.monsterFactory.createMonster(speed, HP)
    this.monsterList.push({ monster, location, nowHP }) // 將創建的怪物及位置添加到怪物列表中
    this.notifyOnMonsterCreated(monster, location)
    return monster
  }

  // 怪物移動 / 調用怪物移動通知方法
  // 在 moveMonster 方法中使用攻擊速度
  moveMonster(): void {
    this.monsterList.forEach((data, index) => {
      data.location += data.monster.speed
      if (data.location > 570) {
        // 超過範圍，執行相應操作
        this.handleMonsterExceededThreshold(data.monster, index)
      }
    })

    this.notifyOnMonsterMoved() // 觸發怪物移動事件
  }

  takeDamage(damage: number, index: number): void {
    if (!this.monsterList[index]) {
      return
    }
    this.monsterList[index].nowHP -= damage
    if (this.monsterList[index].nowHP <= 0) {
      this.monsterList.splice(index, 1)
      this.notifyOnMonsterKilled()
    }
  }

  // 處理超過範圍的怪物
  private handleMonsterExceededThreshold(monster: Monster, index: number): void {
    this.monsterList.splice(index, 1)
    this.notifyOnMonsterExceededThreshold()
  }

  // 怪物創建時通知
  private notifyOnMonsterCreated(monster: Monster, location: number): void {
    this.observers.forEach((observer) => observer.onMonsterCreated(monster, location))
  }

  // 怪物移動時通知
  private notifyOnMonsterMoved(): void {
    this.observers.forEach((observer) => observer.onMonsterMoved())
  }

  // 怪物超出範圍時通知
  private notifyOnMonsterExceededThreshold(): void {
    this.observers.forEach((observer) => observer.onMonsterExceededThreshold())
  }

  // 怪物被擊殺時通知
  private notifyOnMonsterKilled(): void {
    this.observers.forEach((observer) => observer.onMonsterKilled())
  }

  // 獲取當前怪物列表
  getMonsterList(): { monster: Monster; location: number }[] {
    return this.monsterList.slice()
  }

  // 確保各處取得的視同一個怪物管理器
  static GetInstance(): MonsterGenerator {
    if (MonsterGenerator.instance == null) {
      MonsterGenerator.instance = new MonsterGenerator()
    }
    return MonsterGenerator.instance
  }
}
