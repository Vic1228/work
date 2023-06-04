// 抽象公司
abstract class Company {
  constructor(protected name: string) {}

  public Add(company: Company): void {}

  public Remove(company: Company): void {}

  public Display(depth: number): void {}

  public LineOfDuty(): void {}
}

//* 公司
export class ConcreteCompany extends Company {
  private companies: Company[] = []

  constructor(name: string) {
    super(name)
  }

  public Add(company: Company): void {
    this.companies.push(company)
  }

  public Remove(company: Company): void {
    const index = this.companies.indexOf(company)
    if (index !== -1) {
      this.companies.splice(index, 1)
    }
  }

  public Display(depth: number): void {
    console.log('-'.repeat(depth) + this.name)
    this.companies.forEach((company) => {
      company.Display(depth + 2)
    })
  }

  public LineOfDuty(): void {
    this.companies.forEach((company) => {
      company.LineOfDuty()
    })
  }
}

//* 人力資源部門
export class HRDepartment extends Company {
  constructor(name: string) {
    super(name)
  }

  public Display(depth: number): void {
    console.log('-'.repeat(depth) + this.name)
  }

  public LineOfDuty(): void {
    console.log(`${this.name} 負責招聘員工。`)
  }
}

//* 財務部
export class FinanceDepartment extends Company {
  constructor(name: string) {
    super(name)
  }

  public Display(depth: number): void {
    console.log('-'.repeat(depth) + this.name)
  }

  public LineOfDuty(): void {
    console.log(`${this.name} 負責財務管理。`)
  }
}
