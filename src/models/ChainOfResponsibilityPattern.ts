export class RequestItem {
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
  // 設定主管
  public SetSuperior(superior: Manager): void {
    this.superior = superior
  }

  public abstract RequestApplication(request: RequestItem): void
}

//* 經理
export class CommonManager extends Manager {
  public RequestApplication(request: RequestItem): void {
    if (request.RequestType === '請假' && request.Number <= 2) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else {
      if (this.superior !== null) {
        this.superior.RequestApplication(request)
      }
    }
  }
}

//* 總監
export class Majordomo extends Manager {
  public RequestApplication(request: RequestItem): void {
    if (request.RequestType === '請假' && request.Number <= 5) {
      console.log(`${this.name} : ${request.RequestContent} 數量${request.Number} 被批准`)
    } else {
      if (this.superior !== null) {
        this.superior.RequestApplication(request)
      }
    }
  }
}

//* 總經理
export class GeneralManager extends Manager {
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
