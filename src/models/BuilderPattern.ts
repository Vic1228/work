//* 建造者 (確保所有的小人能夠符合規格)
abstract class PersonBuilder {
  abstract buildHead(): void
  abstract buildBody(): void
  abstract buildArmLeft(): void
  abstract buildArmRight(): void
  abstract buildLegLeft(): void
  abstract buildLegRight(): void
}

//* 指揮者
export class PersonDirector {
  private builder: PersonBuilder

  constructor(builder: PersonBuilder) {
    this.builder = builder
  }

  public createPerson(): void {
    this.builder.buildHead()
    this.builder.buildBody()
    this.builder.buildArmLeft()
    this.builder.buildArmRight()
    this.builder.buildLegLeft()
    this.builder.buildLegRight()
  }
}

//* 瘦的小人
export class PersonThinBuilder extends PersonBuilder {
  public buildHead(): void {
    console.log('頭')
  }

  public buildBody(): void {
    console.log('身')
  }

  public buildArmLeft(): void {
    console.log('左手')
  }

  public buildArmRight(): void {
    console.log('右手')
  }

  public buildLegLeft(): void {
    console.log('左腳')
  }

  public buildLegRight(): void {
    console.log('右腳')
  }
}

//* 肥的小人
export class PersonFatBuilder extends PersonBuilder {
  public buildHead(): void {
    console.log('肥頭')
  }

  public buildBody(): void {
    console.log('肥身')
  }

  public buildArmLeft(): void {
    console.log('肥左手')
  }

  public buildArmRight(): void {
    console.log('肥右手')
  }

  public buildLegLeft(): void {
    console.log('肥左腳')
  }

  public buildLegRight(): void {
    console.log('肥右腳')
  }
}
