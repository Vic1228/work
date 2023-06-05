export class Resume {
  public name: string
  public gender?: string
  public age?: string
  public company?: string
  public timeArea?: string

  constructor(name: string) {
    this.name = name
  }

  public setName(name: string): void {
    this.name = name
  }

  public setPersonalInfo(gender: string, age: string): void {
    this.gender = gender
    this.age = age
  }

  public setWorkExperience(timeArea: string, company: string): void {
    this.timeArea = timeArea
    this.company = company
  }

  public display(): string {
    return this.name + ' ' + this.gender + ' ' + this.age + ' ' + this.timeArea + ' ' + this.company
  }

  public clone(): Resume {
    const cloneResume = new Resume(this.name)
    cloneResume.gender = this.gender
    cloneResume.age = this.age
    cloneResume.company = this.company
    cloneResume.timeArea = this.timeArea
    return cloneResume
  }
}
