<template>
  <div class="components-container">
    <button @click="dispatch({type: 'decrement'})">
      -
    </button>
    <span>{{ state.count }}</span>
    <button @click="dispatch({type: 'increment'})">
      +
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useReducer } from '@/utils/hooks/useReducer'

export default defineComponent({
  setup() {
    const initialState = { count: 0 }

    function reducer(state: any, action: any) {
      switch (action.type) {
        case 'reset':
          return initialState
        case 'increment':
          return { count: state.count + 1 }
        case 'decrement':
          return { count: state.count - 1 }
      }
    }

    function useStore() {
      return useReducer(reducer, initialState)
    }

    const {
      state,
      dispatch
    } = useStore()

    return {
      state,
      dispatch
    }
  }
})
</script>
