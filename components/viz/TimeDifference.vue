<template>
  <div v-if="isLoaded">
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
  <div v-else>
    Loading chart data...
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import { data, options, loadChartData } from './dataExtractor'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

export default defineComponent({
  name: 'TimeDifference',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line
  },
  setup () {
    const chartData = ref(data)
    const chartOptions = ref(options)
    const isLoaded = ref(false)

    function filterTimeDiffValues () {
      let timeDiffData = chartData.value.datasets[2].data as number[]
      // console.log('Length of timeDiffData before cleanup: ' + timeDiffData.keys.length)
      timeDiffData = timeDiffData.filter(val => val >= 1)
      // console.log('Length of timeDiffData after cleanup: ' + timeDiffData.keys.length)
      return timeDiffData
    }
    // Load CSV data when the component is mounted
    onMounted(async () => {
      await loadChartData('/data_10_16_2024.csv')
      chartData.value.datasets[2].data = filterTimeDiffValues()
      isLoaded.value = true
    })

    return {
      chartData,
      chartOptions,
      isLoaded
    }
  }
})
</script>
<style scoped>
.chart-container {
  position: relative;
  height: 90vh;
  width: 90vw;
}
</style>
