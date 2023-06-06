// 定義防禦塔介面
interface Tower {
  level: number
  upgrade(): void
}

// 具體的防禦塔類別
class ConcreteTower implements Tower {
  level: number
  protected attackTimer: any | null = null

  constructor(level: number) {
    this.level = level
  }

  upgrade(): void {
    this.level++
  }
}

// 防禦塔裝飾者介面
interface TowerDecorator extends Tower {}

// 增加攻擊力的防禦塔裝飾
class AttackTowerDecorator implements TowerDecorator {
  private tower: Tower

  constructor(tower: Tower) {
    this.tower = tower
  }

  get level(): number {
    return this.tower.level
  }

  startAttackTimer(): void {}
  stopAttackTimer(): void {}

  upgrade(): void {
    this.tower.upgrade()
    console.log('攻擊力增加')
  }
}

// 防禦塔工廠
class TowerFactory {
  static createTower(level: number): Tower {
    return new ConcreteTower(level)
  }
}

// 防禦塔生成器管理器
export class TowerGenerator {
  private towerList: { tower: Tower | null; location: number }[] = Array.from(
    { length: 6 },
    () => ({ tower: null, location: 0 })
  )

  // 建造防禦塔
  // 在 TowerGenerator 中生成防禦塔時，傳遞攻擊速度
  generateTower(level: number, location: number, attackSpeed: number): Tower {
    const tower = TowerFactory.createTower(level)
    tower.attackSpeed = attackSpeed
    tower.attackTimer = null
    this.towerList[location].tower = tower
    this.towerList[location].location = location
    return tower
  }

  // 升級防禦塔
  upgradeTower(tower: Tower): void {
    tower.upgrade()
  }

  // 為防禦塔添加攻擊力裝飾
  addAttackDecorator(tower: Tower): Tower {
    return new AttackTowerDecorator(tower)
  }

  // 獲取當前防禦塔列表
  getTowerList(): { tower: Tower | null; location: number }[] {
    return this.towerList.slice()
  }
}
