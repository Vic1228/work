export class User {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class WebSite {
  category: string

  constructor(category: string) {
    this.category = category
  }

  use(user: User): void {
    console.log(`${user.name} 使用 ${this.category} 網站`)
  }
}

export class WebSiteFactory {
  private websites: { [category: string]: WebSite } = {}

  getWebSiteCategory(category: string): WebSite {
    if (!this.websites[category]) {
      this.websites[category] = new WebSite(category)
    }
    return this.websites[category]
  }

  getWebSiteCount(): number {
    return Object.keys(this.websites).length
  }
}


