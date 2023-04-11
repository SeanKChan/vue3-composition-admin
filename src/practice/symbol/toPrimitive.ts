class DateTime {
  private _dateTime: Date
  constructor(year: number, month: number, day: number, hour = 0, minutes = 0, seconds = 0) {
    this._dateTime = new Date(year, month - 1, day, hour, minutes, seconds)
  }

  [Symbol.toPrimitive](hint: string) {
    switch (hint) {
      default:
        return this._dateTime.toString()
      case 'string':
        return this._dateTime.toLocaleString()
      case 'number':
        return this._dateTime.getTime()
    }
  }
}

const myDate = new DateTime(2023, 4, 8, 15, 30, 0)

console.log(myDate)
console.log(Number(myDate) + 10000)
console.log(`${myDate}`)
