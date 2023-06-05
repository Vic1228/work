//* 獨體物件
export class Singleton {
  private static instance: Singleton

  private constructor() {}

  static GetInstance(): Singleton {
    if (Singleton.instance == null) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}
