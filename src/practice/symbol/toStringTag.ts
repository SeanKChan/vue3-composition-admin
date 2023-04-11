class People {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  get [Symbol.toStringTag]() {
    return 'People'
  }
}

const p = new People('张三', 29)
console.log(p.toString())
