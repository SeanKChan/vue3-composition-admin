class MyArray {
  static [Symbol.hasInstance](instance: any) {
    return Array.isArray(instance)
  }
}
const arr = [1, 2, 3]
console.log(arr instanceof MyArray)
