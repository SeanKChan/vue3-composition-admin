<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-21 13:50:19
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-18 14:30:45
-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'
import { usePageVisibility } from '@/utils/hooks'
import useEventEmitter from '@/utils/hooks/useEventEmitter'

export default defineComponent({
  components: {
    AdminDashboard,
    EditorDashboard
  },
  setup() {
    const store = useStore()
    const currentRole = ref('admin-dashboard')
    const roles = computed(() => {
      return store.state.user.roles
    })

    const pageVisible = usePageVisibility()

    const bus = useEventEmitter()

    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'editor-dashboard'
      }
    })

    onMounted(() => {
      bus.useSubcription((val: any) => {
        console.log('recieved: ', val)
      })

      setTimeout(() => {
        bus.emit('hello vue3 hooks ')
      }, 3000)
    })

    return {
      currentRole,
      pageVisible,
      bus
    }
  }
})
</script>
