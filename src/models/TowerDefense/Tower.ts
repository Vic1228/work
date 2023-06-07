import { MonsterGenerator } from './Monster'

//* 定義防禦塔介面
interface Tower {
  level: number
  attackPower: number
  attackSpeed: number
  attackTimer: boolean
  getAttack(): number
}

//* 具體的防禦塔類別
class ConcreteTower implements Tower {
  level: number
  attackPower: number = 1
  attackSpeed: number
  attackTimer: boolean = false

  constructor(level: number, attackSpeed: number) {
    this.level = level
    this.attackSpeed = attackSpeed
  }

  getAttack(): number {
    return this.level * 2 + this.attackPower
  }
}

//* 防禦塔工廠
class TowerFactory {
  static createTower(level: number, attackSpeed: number): Tower {
    return new ConcreteTower(level, attackSpeed)
  }
}

//* 防禦塔強化介面
abstract class TowerStrategy implements Tower {
  protected tower: Tower

  constructor(tower: Tower) {
    this.tower = tower
  }

  get level(): number {
    return this.tower.level
  }

  get attackPower(): number {
    return this.tower.attackPower
  }

  get attackSpeed(): number {
    return this.tower.attackSpeed
  }

  get attackTimer(): boolean {
    return this.tower.attackTimer
  }

  abstract upgrade(): void
  abstract getUpdateMoney(): number

  getAttack(): number {
    return this.tower.getAttack()
  }
}

//* 升級防禦塔
class UpdateLevelTower extends TowerStrategy {
  upgrade(): void {
    this.tower.level += 1
  }
  getUpdateMoney(): number {
    return 100
  }
}
//* 增加攻擊力
class AttackPowerTower extends TowerStrategy {
  upgrade(): void {
    this.tower.attackPower += 2
  }
  getUpdateMoney(): number {
    return 10
  }
}
//* 增加攻擊速度
class AttackSpeedTower extends TowerStrategy {
  upgrade(): void {
    this.tower.attackSpeed -= 10
  }
  getUpdateMoney(): number {
    return 10
  }
}

//* 升級工廠
export class UpdateFactory {
  public strategy: any

  constructor(strategyName: string, tower: Tower) {
    switch (strategyName) {
      case 'UpdateLevelTowerDecorator':
        this.strategy = new UpdateLevelTower(tower)
        break
      case 'AttackPowerTowerDecorator':
        this.strategy = new AttackPowerTower(tower)
        break
      case 'AttackSpeedTowerDecorator':
        this.strategy = new AttackSpeedTower(tower)
        break
    }
  }

  getResult(): any {
    return this.strategy
  }
}

// 抽象觀察者接口
export abstract class TowerObserver {
  abstract OnAttack(towerIndex: number): void
}

// 防禦塔生成器管理器
export class TowerGenerator {
  private observers: TowerObserver[] = []
  private towerList: { tower: Tower | null; location: number }[] = Array.from(
    { length: 6 },
    () => ({ tower: null, location: 0 })
  )

  // 新增觀察防禦塔
  addObserver(observer: TowerObserver): void {
    this.observers.push(observer)
  }

  // 刪除觀察防禦塔
  removeObserver(observer: TowerObserver): void {
    const index = this.observers.indexOf(observer)
    if (index >= 0) {
      this.observers.splice(index, 1)
    }
  }

  // 建造防禦塔
  generateTower(level: number, location: number, attackSpeed: number): Tower {
    const tower = TowerFactory.createTower(level, attackSpeed)
    this.towerList[location].tower = tower
    this.towerList[location].location = location
    return tower
  }

  // 呼叫防禦塔進行攻擊
  attackTower(towerList: any[], monsterList: any[]): void {
    towerList.forEach((tower, towerIndex) => {
      if (!tower.tower) {
        return
      }
      if (!tower.tower.attackTimer) {
        tower.tower.attackTimer = true
        monsterList.forEach((monster, monsterIndex) => {
          const monsterX = monster.location
          const attackRangeStart = towerIndex * 100 // 計算攻擊範圍的起始位置
          const attackRangeEnd = (towerIndex + 1) * 100 // 計算攻擊範圍的結束位置
          if (monsterX >= attackRangeStart && monsterX <= attackRangeEnd) {
            const attack = tower.tower.getAttack()
            const monsterGenerator = MonsterGenerator.GetInstance()
            monsterGenerator.takeDamage(attack, monsterIndex)
            this.notifyOnAttack(towerIndex)
          }
        })
        setTimeout(() => {
          tower.tower.attackTimer = false
        }, tower.tower.attackSpeed)
      }
    })
  }

  // 獲取當前防禦塔列表
  getTowerList(): { tower: Tower | null; location: number }[] {
    return this.towerList.slice()
  }

  // 發出通知現在防禦塔正在進行攻擊
  notifyOnAttack(towerIndex: number): void {
    this.observers.forEach((observer) => observer.OnAttack(towerIndex))
  }
}
