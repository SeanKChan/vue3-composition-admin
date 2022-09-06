
<template>
  <div class="chart-container">
    <div
      id="map"
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, shallowRef } from 'vue'
import { Scene, PointLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export default {
  setup() {
    const scene: any = shallowRef(null)

    onMounted(() => {
      scene.value = new Scene({
        id: 'map',
        map: new Mapbox({
          center: [113.753094, 34.767052],
          pitch: 0,
          style: 'dark',
          zoom: 1,
          minZoom: 0,
          maxZoom: 10
        })
      })
      scene.value.on('loaded', () => {
        fetch(
          'https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json'
        )
          .then(res => res.json())
          .then(data => {
            data.features = data.features.filter((item: { properties: { capacity: number } }) => {
              return item.properties.capacity > 800
            })
            const pointLayer = new PointLayer({})
              .source(data)
              .shape('circle')
              .size('capacity', [0, 16])
              .color('capacity', [
                '#34B6B7',
                '#4AC5AF',
                '#5FD3A6',
                '#7BE39E',
                '#A1EDB8',
                '#CEF8D6'
              ])
              .active(true)
              .style({
                opacity: 0.5,
                strokeWidth: 0
              })

            scene.value.addLayer(pointLayer)
          })
      })
    })

    return {
      scene
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
