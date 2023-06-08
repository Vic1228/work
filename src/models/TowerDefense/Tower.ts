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
    this.attackSpeed = attackSpeed - level * 10
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
    this.tower.attackPower += 1
  }
  getUpdateMoney(): number {
    return 10
  }
}
//* 增加攻擊速度
class AttackSpeedTower extends TowerStrategy {
  upgrade(): void {
    this.tower.attackSpeed -= 0.5
  }
  getUpdateMoney(): number {
    return 10
  }
}

//* 升級工廠
export class UpdateFactory {
  private strategy: any

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

//* 抽象觀察者接口
export abstract class TowerObserver {
  abstract OnAttack(towerIndex: number): void
}

//* 防禦塔生成器管理器
export class TowerGenerator {
  private observers: TowerObserver[] = []
  private towerList: { tower: Tower | null; location: number }[]
  private bulletList: {
    id: number
    bulletSpeed: number
    bulletDamage: number
    targetMonsterIndex: number
    bulletPosition: {
      x: number
      y: number
    }
  }[]

  private mapWidth: number
  private towerCount: number

  constructor({ mapWidth, towerCount }: { mapWidth: number; towerCount: number }) {
    this.mapWidth = mapWidth
    this.towerCount = towerCount
    this.bulletList = []
    this.towerList = Array.from({ length: this.towerCount }, () => ({ tower: null, location: 0 }))
  }

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
        for (const monsterIndex in monsterList) {
          const monster = monsterList[monsterIndex]
          const monsterX = monster.location
          const attackRange = this.mapWidth / this.towerCount
          const attackRangeStart = towerIndex * attackRange - 50 // 計算攻擊範圍的起始位置
          const attackRangeEnd = (towerIndex + 1) * attackRange + 50 // 計算攻擊範圍的結束位置
          if (monsterX >= attackRangeStart && monsterX <= attackRangeEnd) {
            this.bulletList.push({
              id: Date.now(),
              bulletSpeed: (1 / tower.tower.attackSpeed) * 1500,
              bulletDamage: tower.tower.getAttack(),
              targetMonsterIndex: Number(monsterIndex),
              bulletPosition: {
                x: attackRange * towerIndex + attackRange / 2, // 子彈的起始 x 座標
                y: 200 // 子彈的起始 y 座標
              }
            })
            this.notifyOnAttack(towerIndex)
            break // 在 push 完子彈後立即退出迴圈
          }
        }
        setTimeout(() => {
          tower.tower.attackTimer = false
        }, tower.tower.attackSpeed)
      }
    })
  }

  // 更新子彈位置以及觸發攻擊
  moveBullets(monsterList: any[]): void {
    this.bulletList.forEach((bullet: any, index: number) => {
      const targetMonster = monsterList[bullet.targetMonsterIndex]
      if (targetMonster) {
        const bulletSpeed = bullet.bulletSpeed
        const bulletDamage = bullet.bulletDamage
        const bulletStartX = bullet.bulletPosition.x
        const bulletStartY = bullet.bulletPosition.y
        const bulletTargetX = targetMonster.location
        const bulletTargetY = 170

        // 計算子彈的移動路線
        const dx = bulletTargetX - bulletStartX
        const dy = bulletTargetY - bulletStartY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const vx = (dx / distance) * bulletSpeed
        const vy = (dy / distance) * bulletSpeed

        // 更新子彈的座標
        bullet.bulletPosition.x += vx
        bullet.bulletPosition.y += vy

        // 判斷子彈是否到達目標座標
        if (
          Math.abs(bullet.bulletPosition.x - bulletTargetX) < bulletSpeed &&
          Math.abs(bullet.bulletPosition.y - bulletTargetY) < bulletSpeed
        ) {
          const monsterGenerator = MonsterGenerator.GetInstance()
          monsterGenerator.takeDamage(bulletDamage, bullet.targetMonsterIndex)
          this.bulletList.splice(index, 1)
        }
      } else {
        this.bulletList.splice(index, 1)
      }
    })
  }

  // 獲取當前防禦塔列表
  getTowerList(): { tower: Tower | null; location: number }[] {
    return this.towerList
  }

  // 獲取當前子彈列表
  getBulletList(): { bulletSpeed: number; bulletDamage: number }[] {
    return this.bulletList
  }

  // 發出通知現在防禦塔正在進行攻擊
  notifyOnAttack(towerIndex: number): void {
    this.observers.forEach((observer) => observer.OnAttack(towerIndex))
  }
}
