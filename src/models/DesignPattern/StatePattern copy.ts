abstract class State {
  abstract WriteProgram(Work: Work): string
}

class ForenoonState extends State {
  WriteProgram(Work: Work): string {
    if (Work.State < 12) {
      return `當前時間：${Work.State}點 上午工作，精神百倍！`
    } else {
      Work.setState(new NoonState())
      return Work.WriteProgram()
    }
  }
}

class NoonState extends State {
  WriteProgram(Work: Work): string {
    if (Work.State < 13) {
      return `當前時間：${Work.State}點 午休`
    } else {
      Work.setState(new AfternoonState())
      return Work.WriteProgram()
    }
  }
}

class AfternoonState extends State {
  WriteProgram(Work: Work): string {
    if (Work.State < 17) {
      return `當前時間：${Work.State}點 下午狀態不錯`
    } else {
      Work.setState(new EveningState())
      return Work.WriteProgram()
    }
  }
}

class EveningState extends State {
  WriteProgram(Work: Work): string {
    if (Work.Finish) {
      Work.setState(new RestState())
      return Work.WriteProgram()
    } else if (Work.State < 21) {
      return `當前時間：${Work.State}點 加班哦`
    } else {
      Work.setState(new SleepingState())
      return Work.WriteProgram()
    }
  }
}

class SleepingState extends State {
  WriteProgram(Work: Work): string {
    return `當前時間：${Work.State}點 不行了，睡著了`
  }
}

class RestState extends State {
  WriteProgram(Work: Work): string {
    return `當前時間：${Work.State}點 下班啦`
  }
}

// Work類別
export class Work {
  public State: number = 9
  public Finish: boolean = false
  private currentState: State

  constructor() {
    this.currentState = new ForenoonState()
  }

  public setState(state: State): void {
    this.currentState = state
  }

  public WriteProgram(): string {
    return this.currentState.WriteProgram(this)
  }
}
