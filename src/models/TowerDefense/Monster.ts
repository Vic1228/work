// 抽象怪物
abstract class Monster {
  abstract speed: number
  abstract HP: number
  abstract move(): void
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

  move(): void {
    console.log('怪物移動時執行什麼？')
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
abstract class MonsterObserver {
  abstract onMonsterCreated(monster: Monster, location: number): void // 怪物創建時觸發
  abstract onMonsterMoved(): void // 怪物移動時觸發
  abstract onMonsterExceededThreshold(): void // 怪物位置超過後觸發
}

// 怪物生成器管理器
export class MonsterGenerator {
  private observers: MonsterObserver[] = []
  private monsterFactory: MonsterFlyweightFactory
  private monsterList: { monster: Monster; location: number }[] = []

  constructor() {
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
  generateMonster(speed: number, HP: number, location: number): Monster {
    const monster = this.monsterFactory.createMonster(speed, HP)
    this.monsterList.push({ monster, location }) // 將創建的怪物及位置添加到怪物列表中
    this.notifyOnMonsterCreated(monster, location)
    return monster
  }

  // 怪物移動 / 調用怪物移動通知方法
  moveMonster(): void {
    this.monsterList.forEach((data, index) => {
      data.location += data.monster.speed

      if (data.location > 530) {
        // 超過範圍，執行相應操作
        this.handleMonsterExceededThreshold(data.monster, index)
      }
    })

    this.notifyOnMonsterMoved() // 觸發怪物移動事件
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

  // 獲取當前怪物列表
  getMonsterList(): { monster: Monster; location: number }[] {
    return this.monsterList.slice()
  }
}
