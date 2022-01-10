<template>
  <div class="components-container">
    <div
      class="amap-container"
      id="container"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export default defineComponent({
  setup() {
    // 声明浅拷贝对象，防止对AMap对象的属性进行劫持监听
    const map = shallowRef(null)

    const initMap = async () => {
      try {
        const AMap = await AMapLoader.load({
          key: 'd72867db708c8e40ea50ed8011ac75b8',
          version: '2.0',
          plugins: []
        })
        map.value = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 5, // 初始化地图级别
          center: [105.602725, 37.076636] // 初始化地图中心点位置
        })
      } catch (err) {
        console.error('AMapSDK加载失败: ', err)
      }
    }

    onMounted(async () => {
      await initMap()
    })

    return {
      map
    }
  }
})
</script>

<style lang="scss" scoped>
.amap-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 600px;
}
</style>
