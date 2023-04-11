class MyRegExp extends RegExp {
  [Symbol.match](str: string) {
    const matches = super[Symbol.match](str)
    if (matches) {
      return matches.map(x => {
        return `匹配到了，${x}`
      })
    }
    return matches
  }
}

const regex = new MyRegExp('hello', 'g')
const result = 'hello world'.match(regex)
console.log(result)
