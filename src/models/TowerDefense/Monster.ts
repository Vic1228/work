// 抽象怪物
export abstract class Monster {
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
export abstract class MonsterObserver {
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
  generateMonster(speed: number, HP: number, location: number, nowHP: number): Monster {
    const monster = this.monsterFactory.createMonster(speed, HP)
    this.monsterList.push({ monster, location, nowHP }) // 將創建的怪物及位置添加到怪物列表中
    this.notifyOnMonsterCreated(monster, location, nowHP)
    return monster
  }

  // 怪物移動 / 調用怪物移動通知方法
  // 在 moveMonster 方法中使用攻擊速度
  moveMonster(towerList: any): void {
    this.monsterList.forEach((data, index) => {
      data.location += data.monster.speed

      if (data.location > 530) {
        // 超過範圍，執行相應操作
        this.handleMonsterExceededThreshold(data.monster, index)
      } else {
        const monsterX = data.location
        towerList.forEach((tower: any, towerIndex: number) => {
          if (!tower.tower) {
            return
          }
          const attackRangeStart = towerIndex * 88 // 計算攻擊範圍的起始位置
          const attackRangeEnd = (towerIndex + 1) * 88 // 計算攻擊範圍的結束位置
          if (monsterX >= attackRangeStart && monsterX <= attackRangeEnd) {
            // 在攻擊範圍內，進行攻擊
            const attackSpeed = tower.tower.attackSpeed // 獲取攻擊速度

            // 檢查攻擊計時器是否存在，如果不存在，則進行攻擊
            if (!tower.tower.attackTimer) {
              data.nowHP -= tower.tower.level * 10
              console.log('🚀 ~ MonsterGenerator ~ towerList.forEach ~ data.nowHP:', data.nowHP)
              if (data.nowHP <= 0) {
                this.monsterList.splice(index, 1)
              }

              // 設定攻擊計時器，間隔攻擊速度的時間再進行下一次攻擊
              tower.tower.attackTimer = setInterval(() => {
                data.nowHP -= tower.tower.level * 10
                if (data.nowHP <= 0) {
                  this.monsterList.splice(index, 1)
                }
                console.log('🚀 ~ MonsterGenerator ~ towerList.forEach ~ data:', data)
              }, attackSpeed)
            }
          } else {
            // 不在攻擊範圍內，停止攻擊並清除攻擊計時器
            if (tower.tower.attackTimer) {
              clearInterval(tower.tower.attackTimer)
              tower.tower.attackTimer = null
            }
          }
        })
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
