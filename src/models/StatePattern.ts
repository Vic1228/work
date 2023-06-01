abstract class State {
  public abstract WriteProgram(work: Work): string
}

class ForenoonState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 上午工作，精神百倍！`
  }
}

class NoonState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 午休`
  }
}

class AfternoonState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 下午狀態不錯`
  }
}

class EveningState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 加班哦`
  }
}

class SleepingState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 不行了，睡著了`
  }
}

class RestState extends State {
  public WriteProgram(work: Work): string {
    return `當前時間：${work.State}點 下班啦`
  }
}

export class Work {
  public State: number = 9
  public Finish: boolean = false
  private StateList: { [key: string]: State } = {}
  private currentState: State

  constructor() {
    this.currentState = new ForenoonState()
    this.StateList = {
      ForenoonState: new ForenoonState(),
      NoonState: new NoonState(),
      AfternoonState: new AfternoonState(),
      EveningState: new EveningState(),
      SleepingState: new SleepingState(),
      RestState: new RestState()
    }
  }

  public WriteProgram(): string {
    switch (true) {
      case this.State < 12:
        this.currentState = this.StateList.ForenoonState
        break
      case this.State < 13:
        this.currentState = this.StateList.NoonState
        break
      case this.State < 17:
        this.currentState = this.StateList.AfternoonState
        break
      case this.State < 21:
        if (this.Finish) {
          this.currentState = this.StateList.RestState
        } else {
          this.currentState = this.StateList.EveningState
        }
        break
      default:
        this.currentState = this.StateList.SleepingState
    }
    return this.currentState.WriteProgram(this)
  }
}
