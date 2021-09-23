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
import { computed, defineComponent, onBeforeMount, ref, watchEffect } from 'vue'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'
import { usePageVisibility } from '@/utils/hooks'

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

    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'editor-dashboard'
      }
    })

    watchEffect(() => {
      console.log('visible', pageVisible.value)
    })

    return {
      currentRole,
      pageVisible
    }
  }
})
</script>
