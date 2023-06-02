class RequestItem {
  public RequestType: string
  public RequestContent: string
  public Number: number

  constructor(RequestType: string, RequestContent: string, Number: number) {
    this.RequestType = RequestType
    this.RequestContent = RequestContent
    this.Number = Number
  }
}

//* 抽象主管
abstract class Manager {
  public name: string
  public superior: Manager | null

  constructor(name: string) {
    this.name = name
    this.superior = null
  }

  public SetSuperior(superior: Manager): void {
    this.superior = superior
  }

  public abstract RequestApplication(request: RequestItem): void
}

//* 經理
class CommonManager extends Manager {
  public RequestApplication(request: RequestItem): void {
    if (request.RequestType === '加薪' && request.Number <= 500) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else {
      if (this.superior !== null) {
        this.superior.RequestApplication(request)
      }
    }
  }
}

//* 總監
class Majordomo extends Manager {
  public RequestApplication(request: RequestItem): void {
    if (request.RequestType === '加薪' && request.Number <= 1000) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else {
      if (this.superior !== null) {
        this.superior.RequestApplication(request)
      }
    }
  }
}

//* 總經理
class GeneralManager extends Manager {
  public RequestApplication(request: RequestItem): void {
    if (request.RequestType === '請假') {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else if (request.RequestType === '加薪' && request.Number <= 500) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else if (request.RequestType === '加薪' && request.Number > 500) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 再說吧`)
    }
  }
}

export class Program {
  static Main(): void {
    const commonManager = new CommonManager('經理')
    const majordomo = new Majordomo('總監')
    const generalManager = new GeneralManager('總經理')

    commonManager.SetSuperior(majordomo)
    majordomo.SetSuperior(generalManager)

    const request1 = new RequestItem('加薪', '要求加薪', 50)
    commonManager.RequestApplication(request1)

    const request2 = new RequestItem('請假', '要求請假', 90)
    commonManager.RequestApplication(request2)
  }
}
