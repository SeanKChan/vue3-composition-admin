<!--
 * @Description: 大小选择
 * @Author: ZY
 * @Date: 2020-12-24 09:59:06
 * @LastEditors: SCY
 * @LastEditTime: 2021-04-02 14:32:50
-->
<template>
  <div>
    <el-dropdown
      id="size-select"
      trigger="click"
      @command="handleSetSize"
    >
      <div>
        <svg
          aria-hidden="true"
          class="icon"
          font-size="40px"
        >
          <use xlink:href="#iconshiliangzhinengduixiang" />
        </svg>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :command="item.value"
            :disabled="size===item.value"
          >
            {{
              item.label
            }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useTagsViewStore } from '@/stores/tagsView'

export default defineComponent({
  setup() {
    const { fullPath } = useRoute()
    const router = useRouter()
    const appStore = useAppStore()
    const tagsViewStore = useTagsViewStore()

    function refreshView() {
      tagsViewStore.delAllCachedViews()
      nextTick(() => {
        router.replace({ path: '/redirect' + fullPath }).catch((err) => {
          console.warn(err)
        })
      })
    }

    const state = reactive({
      sizeOptions: [
        {
          label: 'Default',
          value: 'default'
        },
        {
          label: 'Medium',
          value: 'medium'
        },
        {
          label: 'Small',
          value: 'small'
        },
        {
          label: 'Mini',
          value: 'mini'
        }
      ],
      handleSetSize: (size: string) => {
        appStore.changeLanguage(size)
        refreshView()
        ElMessage.success('Switch Size Success')
      }
    })
    const size = computed(() => {
      return appStore.size
    })
    return {
      ...toRefs(state),
      size
    }
  }
})
</script>
