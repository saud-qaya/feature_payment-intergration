<template>
  <div class="progress" style="height: 10px">
    it works.
    <LineChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, TimeScale, LinearScale } from 'chart.js'
import Papa from 'papaparse'
// Chart.js Komponenten registrieren
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, TimeScale, LinearScale)

export default {
  components: {
    LineChart: Line // vue-chartjs Line-Komponente einbinden
  },
  setup () {
    // Reaktive Variablen für Daten und Chart-Optionen
    const chartData = ref(null)
    const chartOptions = ref({
      responsive: true,
      scales: {
        x: {
          type: 'time', // Zeit als X-Achse
          time: {
            unit: 'min', // Zeitintervall auf der X-Achse (z.B. Minuten)
            tooltipFormat: 'll mm:ss:ms' // Format für den Tooltip
          },
          title: {
            display: true,
            text: 'Timestamp'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Noise Level'
          }
        }
      }
    })

    // CSV-Daten laden und in das Chart-Format umwandeln
    const loadCSVData = async () => {
      // Beispiel CSV String (ersetzte es mit deinem tatsächlichen CSV)
      const csvString = `
        timestamp,sensors_ambientData_noise
        2024-10-09 08:00:00.169,35.19362197015299
        2024-10-09 08:00:00.369,34.89283749374632
        2024-10-09 08:00:00.569,34.54829716372913
        ` // Hier deine CSV-Daten laden oder einen Upload implementieren

      // CSV parsen mit PapaParse
      // eslint-disable-next-line import/no-named-as-default-member
      await Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          // Extrahiere die Timestamps und Sensorwerte
          const labels = result.data.map(row => row.timestamp)
          const values = result.data.map(row => row.sensors_ambientData_noise)

          // Erstelle die Chart-Datenstruktur
          chartData.value = {
            labels,
            datasets: [{
              label: 'Noise Level',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false // Fülle den Bereich unter der Linie nicht
            }]
          }
        }
      })
    }

    // CSV-Daten laden, sobald die Komponente gemountet ist
    onMounted(() => {
      loadCSVData()
    })

    return {
      chartData,
      chartOptions
    }
  }
}
</script>

<style scoped>
/* Optional: Styles für das Chart */
canvas {
  max-width: 100%;
  height: auto;
}
</style>
