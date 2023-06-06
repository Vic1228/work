// 抽象防禦塔
abstract class DefenseTower {
  abstract level: number
  abstract attack(): void
  abstract upgrade(): void
}

// 具體的防禦塔類
export class ConcreteDefenseTower extends DefenseTower {
  level: number

  constructor(level: number) {
    super()
    this.level = level
  }

  attack(): void {
    console.log(`防禦塔攻擊，等級：${this.level}`)
  }

  upgrade(): void {
    console.log('防禦塔升級')
    this.level++
  }
}

// 防禦塔享元工廠
class DefenseTowerFlyweightFactory {
  private towers: { [key: string]: DefenseTower } = {}

  createTower(level: number): DefenseTower {
    const key = `${level}`
    if (!this.towers[key]) {
      this.towers[key] = new ConcreteDefenseTower(level)
    }
    return this.towers[key]
  }
}
