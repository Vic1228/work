abstract class TestPaper {
  public Question1(): void {
    console.log('題目1')
    console.log('答案1: ' + this.Answer1())
  }
  public Question2(): void {
    console.log('題目2')
    console.log('答案2: ' + this.Answer2())
  }
  public Question3(): void {
    console.log('題目3')
    console.log('答案3: ' + this.Answer3())
  }
  public abstract Answer1(): string
  public abstract Answer2(): string
  public abstract Answer3(): string

  public display(): void {
    this.Question1()
    this.Question2()
    this.Question3()
  }
}

//* 學生A
class TestPaperA extends TestPaper {
  public answer1: string
  public answer2: string
  public answer3: string
  constructor(answer1: string, answer2: string, answer3: string) {
    super()
    this.answer1 = answer1
    this.answer2 = answer2
    this.answer3 = answer3
  }

  public Answer1(): string {
    return this.answer1
  }

  public Answer2(): string {
    return this.answer2
  }

  public Answer3(): string {
    return this.answer3
  }
}

//* 學生B
class TestPaperB extends TestPaper {
  public answer1: string
  public answer2: string
  public answer3: string
  constructor(answer1: string, answer2: string, answer3: string) {
    super()
    this.answer1 = answer1
    this.answer2 = answer2
    this.answer3 = answer3
  }

  public Answer1(): string {
    return this.answer1
  }

  public Answer2(): string {
    return this.answer2
  }

  public Answer3(): string {
    return this.answer3
  }
}

export class Program {
  public Main(): void {
    console.log('學生A抄的試卷')
    const testPaperA: TestPaper = new TestPaperA('A', 'C', 'D')
    testPaperA.display()

    console.log('學生B抄的試卷')
    const testPaperB: TestPaper = new TestPaperB('A', 'A', 'D')
    testPaperB.display()
  }
}

