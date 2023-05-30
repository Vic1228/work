export class person {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  show(): string {
    return this.name
  }
}

export class finery extends person {
  public component: person

  constructor(component: person) {
    super(component.name)
    this.component = component
  }

  show(): string {
    return this.component.show()
  }
}

export class tShirt extends finery {
  show(): string {
    return '大T恤 ' + this.component.show()
  }
}

export class suit extends finery {
  show(): string {
    return '西裝 ' + this.component.show()
  }
}
