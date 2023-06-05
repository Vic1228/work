//* 用戶物件
export class User {
  private name: string = ''

  constructor(name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }
}

//* 抽象網站
abstract class WebSite {
  abstract use(user: User): void
}

//* 實體網站
class ConcreteWebSite extends WebSite {
  private type: string = ''

  constructor(type: string) {
    super()
    this.type = type
  }

  public use(user: User): void {
    console.log(`用戶：${user.getName()}、網站分類：${this.type}`)
  }
}

//* 網站工廠
export class WebSiteFactory {
  private pool: { [key: string]: WebSite } = {}

  public getWebSiteCategory(type: string): WebSite {
    if (!this.pool[type]) {
      this.pool[type] = new ConcreteWebSite(type)
    }
    return this.pool[type]
  }

  public getWebSiteCount(): number {
    return Object.keys(this.pool).length
  }
}
