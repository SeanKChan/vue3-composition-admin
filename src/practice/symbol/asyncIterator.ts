class AsyncDataSource {
  _data: any;
  constructor(data: string[]) {
    this._data = data
  }

  async * [Symbol.asyncIterator]() {
    for (const item of this._data) {
      const result = await this._processAsyncData(item)
      yield result
    }
  }

  async _processAsyncData(item: string) {
    // 模拟异步处理数据的过程
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item.toUpperCase())
      }, Math.random() * 1000)
    })
  }
}

async function processData() {
  const dataSource = new AsyncDataSource(['a', 'b', 'c', 'd', 'e'])
  for await (const data of dataSource) {
    console.log(data)
  }
}

processData()
