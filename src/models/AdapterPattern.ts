abstract class Player {
  name: string
  constructor(name: string) {
    this.name = name
  }
  abstract Attack(): void
  abstract Defense(): void
}

export class Forwards extends Player {
  constructor(name: string) {
    super(name)
  }

  Attack(): void {
    console.log('前鋒' + this.name + '進攻')
  }

  Defense(): void {
    console.log('前鋒' + this.name + '防守')
  }
}

export class Center extends Player {
  constructor(name: string) {
    super(name)
  }

  Attack(): void {
    console.log('中鋒' + this.name + '進攻')
  }

  Defense(): void {
    console.log('中鋒' + this.name + '防守')
  }
}

export class Guards extends Player {
  constructor(name: string) {
    super(name)
  }

  Attack(): void {
    console.log('後衛' + this.name + '進攻')
  }

  Defense(): void {
    console.log('後衛' + this.name + '防守')
  }
}

class ForeignCenter {
  public name: string
  constructor(name: string) {
    this.name = name
  }

  攻擊(): void {
    console.log('外籍中鋒' + this.name + '進攻')
  }

  防守(): void {
    console.log('外籍中鋒' + this.name + '防守')
  }
}

//* 翻譯人員
export class Translator extends Player {
  wjzf: ForeignCenter

  constructor(name: string) {
    super(name)
    this.wjzf = new ForeignCenter(name)
  }

  Attack(): void {
    this.wjzf.攻擊()
  }

  Defense(): void {
    this.wjzf.防守()
  }
}
