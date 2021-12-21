/**
 * 参考redux实现思路
 * 1. store维护全局的state数据状态
 * 2. 各个组件按需使用state中的数据，并监听state变化
 * 3. reducer接受action并返回新的state，组件可以通过dispatch传递action触发reducer
 * 4. state更新后，通知相关依赖更新数据
 */

import { ref } from 'vue'

export interface IAction {
  type: string
  payload: any
}

export function useReducer(reducer: Function, initialState = {}) {
  const state = ref(initialState)
  // 约定action格式为 {type:string, payload: any}
  const dispatch = (action: IAction) => {
    state.value = reducer(state.value, action)
  }
  return {
    state,
    dispatch
  }
}
