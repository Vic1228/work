// 建造者 (確保所有的小人能夠符合規格)
export abstract class PersonBuilder {
  private person: Person

  constructor(person: Person) {
    this.person = person
  }

  public createPerson(): Person {
    this.person = new Person(
      this.buildHead(),
      this.buildBody(),
      this.buildArmLeft(),
      this.buildArmRight(),
      this.buildLegLeft(),
      this.buildLegRight()
    )
    return this.person
  }

  public abstract buildHead(): string
  public abstract buildBody(): string
  public abstract buildArmLeft(): string
  public abstract buildArmRight(): string
  public abstract buildLegLeft(): string
  public abstract buildLegRight(): string
}

// 瘦的小人建造者
export class ThinPersonBuilder extends PersonBuilder {
  public buildHead(): string {
    return '瘦頭'
  }

  public buildBody(): string {
    return '瘦身'
  }

  public buildArmLeft(): string {
    return '瘦左手'
  }

  public buildArmRight(): string {
    return '瘦右手'
  }

  public buildLegLeft(): string {
    return '瘦左腳'
  }

  public buildLegRight(): string {
    return '瘦右腳'
  }
}

// 肥的小人建造者
export class FatPersonBuilder extends PersonBuilder {
  public buildHead(): string {
    return '肥頭'
  }

  public buildBody(): string {
    return '肥身'
  }

  public buildArmLeft(): string {
    return '肥左手'
  }

  public buildArmRight(): string {
    return '肥右手'
  }

  public buildLegLeft(): string {
    return '肥左腳'
  }

  public buildLegRight(): string {
    return '肥右腳'
  }
}

// 指揮者
export class PersonDirector {
  private builder: PersonBuilder

  constructor(builder: PersonBuilder) {
    this.builder = builder
  }

  public createPerson(): Person {
    return this.builder.createPerson()
  }
}

// 具體的小人
export class Person {
  private head: string
  private body: string
  private armLeft: string
  private armRight: string
  private legLeft: string
  private legRight: string

  constructor(
    head: string = '',
    body: string = '',
    armLeft: string = '',
    armRight: string = '',
    legLeft: string = '',
    legRight: string = ''
  ) {
    this.head = head
    this.body = body
    this.armLeft = armLeft
    this.armRight = armRight
    this.legLeft = legLeft
    this.legRight = legRight
  }

  public display(): void {
    console.log(`頭：${this.head}`)
    console.log(`身：${this.body}`)
    console.log(`左手：${this.armLeft}`)
    console.log(`右手：${this.armRight}`)
    console.log(`左腳：${this.legLeft}`)
    console.log(`右腳：${this.legRight}`)
  }
}
