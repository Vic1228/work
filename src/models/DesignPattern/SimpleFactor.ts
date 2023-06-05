//* 運算類別
class Operation {
  calculate(num1: number, num2: number): number {
    return 0
  }
}
//* 加法運算
class AddOperation extends Operation {
  calculate(num1: number, num2: number): number {
    return num1 + num2
  }
}
//* 減法運算
class SubtractOperation extends Operation {
  calculate(num1: number, num2: number): number {
    return num1 - num2
  }
}
//* 乘法運算
class MultiplyOperation extends Operation {
  calculate(num1: number, num2: number): number {
    return num1 * num2
  }
}
//* 除法運算
class DivideOperation extends Operation {
  calculate(num1: number, num2: number): number {
    return num1 / num2
  }
}
//* 簡單運算工廠類別
export class OperationFactory {
  static createOperation(operator: string): Operation {
    switch (operator) {
      case '+':
        return new AddOperation()
      case '-':
        return new SubtractOperation()
      case '*':
        return new MultiplyOperation()
      case '/':
        return new DivideOperation()
      default:
        throw new Error('錯誤~~')
    }
  }
}
