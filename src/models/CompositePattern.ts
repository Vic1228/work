// 抽象公司
abstract class Company {
  constructor(protected name: string) {}

  public Add(company: Company): void {}

  public Remove(company: Company): void {}

  public Display(depth: number): void {}

  public LineOfDuty(): void {}
}

//* 公司名稱
class ConcreteCompany extends Company {
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
class HRDepartment extends Company {
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
class FinanceDepartment extends Company {
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

export class Program {
  static Main(): void {
    const root = new ConcreteCompany('北京總公司')
    root.Add(new HRDepartment('總公司人力資源部'))
    root.Add(new FinanceDepartment('總公司財務部'))

    const comp = new ConcreteCompany('上海華東分公司')
    comp.Add(new HRDepartment('華東分公司人力資源部'))
    comp.Add(new FinanceDepartment('華東分公司財務部'))
    root.Add(comp)

    const comp1 = new ConcreteCompany('南京辦事處')
    comp1.Add(new HRDepartment('南京辦事處人力資源部'))
    comp1.Add(new FinanceDepartment('南京辦事處財務部'))
    comp.Add(comp1)

    const comp2 = new ConcreteCompany('杭州南京辦事處')
    comp2.Add(new HRDepartment('南京代表處人力資源部'))
    comp2.Add(new FinanceDepartment('南京代表處財務部'))
    comp.Add(comp2)

    console.log('結構圖')
    root.Display(1)

    console.log('職責')
    root.LineOfDuty()
  }
}
