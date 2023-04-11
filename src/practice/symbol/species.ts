class MyArray2 extends Array {
  static get [Symbol.species]() {
    return Array
  }

  hello() {
    return 'hello'
  }
}

const arr1 = new MyArray2()
arr1.push(1)
arr1.push(2)
arr1.push(3)
const arr2 = arr1.map(x => x * 2)
console.log(arr1 instanceof MyArray2)
console.log(arr2 instanceof MyArray2)
console.log(arr1.hello())
console.log(arr2)
