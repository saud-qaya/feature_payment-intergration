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
  name: 'LineChart',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line
  },
  setup () {
    const chartData = ref(data)
    const chartOptions = ref(options)
    const isLoaded = ref(false)

    // Load CSV data when the component is mounted
    onMounted(async () => {
      await loadChartData('/data_10_16_2024.csv')
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
