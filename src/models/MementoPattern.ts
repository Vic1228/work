export class GameCharacter {
  public vit: number
  public str: number
  public int: number
  constructor() {
    this.vit = 0
    this.str = 0
    this.int = 0
  }

  public GetInitState() {
    this.vit = 100
    this.str = 100
    this.int = 100
  }

  public StartDisplay() {
    console.log('角色當前狀態')
    console.log('體力' + this.vit)
    console.log('力量' + this.str)
    console.log('智力' + this.int)
  }

  public Fight() {
    console.log('戰鬥開始')
    console.log('血量從' + this.vit + '變成了' + Math.floor(Math.random() * 100))
    this.vit = 5
    console.log('力量從' + this.str + '變成了' + Math.floor(Math.random() * 100))
    this.str = 9
    console.log('智力從' + this.int + '變成了' + Math.floor(Math.random() * 100))
    this.int = 7
  }

  public SaveState() {
    return new RoleStateMemento(this.vit, this.str, this.int)
  }

  public RecoveryState(memento: RoleStateMemento) {
    this.vit = memento.vit
    this.str = memento.str
    this.int = memento.int
  }
}

class RoleStateMemento {
  public vit: number
  public str: number
  public int: number
  constructor(vit: number, str: number, int: number) {
    this.vit = vit
    this.str = str
    this.int = int
  }

  public RoleStateMemento(vit: number, str: number, int: number) {
    this.vit = vit
    this.str = str
    this.int = int
  }
}

export class RoleStateCareTaker {
  public Memento: RoleStateMemento

  constructor(Memento: RoleStateMemento) {
    this.Memento = Memento
  }
}
