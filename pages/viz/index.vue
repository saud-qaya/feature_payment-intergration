<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-0 mx-0">
          <video-background
            src="/video/Tropics.mp4"
            preload="auto"
            poster="/images/posters/poster.png"
            style=" height: 100vh;"
          >
            <h2>Line Chart</h2>
            <LineChart />
            <h2>Time Chart</h2>
            <TimeDifference />
          </video-background>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

// import DeepCareAnalyzer from '../components/viz/DeepCareAnalyzer'
import LineChart from '~/components/viz/LineChart.vue'
import TimeDifference from '~/components/viz/TimeDifference.vue'

export default {
  components: { LineChart, TimeDifference },
  setup () {
    definePageMeta({
      middleware: 'auth'
    })
    const { t } = useI18n()
    const localePath = useLocalePath()
    const lineChart = ref(null)
    return {
      t,
      localePath,
      lineChart
    }
  },

  computed: {
    // Berechnete Eigenschaft für die dynamische Übersetzung des Titels
    title () {
      return 'Deep Care Viz'
    }
  },

  methods: {

  }
}
</script>

  <style>
  #myVideo{
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;

    padding: 0;
    margin: 0;
    z-index: -99;
  }
  .adaptive{
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
  .spotifyplayer{
  display: flex;
  flex-direction: column; /* Ensures vertical centering if needed */
  align-items: center; /* Horizontally centers content in a flex-direction: column */
  justify-content: center;
  }
  .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5); /* Grey color with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  pointer-events: none; /* Allows interaction with elements under the overlay */
}
 .tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

  </style>
