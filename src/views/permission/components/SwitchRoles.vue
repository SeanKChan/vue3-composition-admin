<!--
 * @Description:  切换角色控件
 * @Author: ZY
 * @Date: 2021-01-11 15:45:24
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-11 17:45:04
-->
<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ t('permission.roles') }}： {{ roles }}
    </div>
    {{ t('permission.switchRoles') }}：
    <el-radio-group v-model="currentRole">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    const roles = computed(() => userStore.roles)
    const currentRole = ref(roles.value[0])
    watch(currentRole, (value) => {
      userStore.changeRoles(value)
    })
    return {
      t,
      roles,
      currentRole
    }
  }
})
</script>
