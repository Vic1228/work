//* 抽象怪物
abstract class Monster {
  abstract speed: number
  abstract HP: number
  abstract move(): void

  location: number = 1

  setLocation(location: number): void {
    this.location = location
  }
}

//* 具體的怪物類別
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

//* 怪物享元工廠
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

// 抽象觀察者介面
abstract class MonsterObserver {
  abstract onMonsterCreated(monster: Monster): void // 怪物建造時觸發
  abstract onMonsterMoved(monster: Monster): void // 怪物移動時觸發
}

//* 怪物生成器管理器
export class MonsterGenerator {
  private observers: MonsterObserver[] = []
  private monsterFactory: MonsterFlyweightFactory
  private monsterList: Monster[] = []

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
  generateMonster(speed: number, HP: number): Monster {
    const monster = this.monsterFactory.createMonster(speed, HP)
    const randomLocation = Math.floor(Math.random() * 50) + 1
    monster.setLocation(randomLocation)
    this.monsterList.push(monster) // 將創建的怪物添加到怪物列表中
    this.notifyOnMonsterCreated(monster)
    return monster
  }

  // 怪物移動 / 調用怪物移動通知方法
  moveMonster(monster: Monster, location: number): void {
    console.log('🚀 ~ MonsterGenerator ~ moveMonster ~ monster:', monster)
    monster.setLocation(location) // 更新怪物的位置
    monster.move()
    this.notifyOnMonsterMoved(monster) // 觸發怪物移動事件
  }

  // 怪物創建時通知
  private notifyOnMonsterCreated(monster: Monster): void {
    this.observers.forEach((observer) => observer.onMonsterCreated(monster))
  }

  // 怪物移動時通知
  private notifyOnMonsterMoved(monster: Monster): void {
    this.observers.forEach((observer) => observer.onMonsterMoved(monster))
  }

  // 取得目前怪物清單
  getMonsterList(): Monster[] {
    return this.monsterList.map((monster) => {
      return {
        ...monster,
        location: monster.location
      }
    })
  }
}
