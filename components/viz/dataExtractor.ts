import type { ChartData, ChartOptions } from 'chart.js'
import Papa from 'papaparse'

// Initialize empty arrays for the chart data
const labels: string[] = []
const noise: number[] = []
const disturb: number[] = []
let timediff: number[] = []

// Funktion zum Formatieren des Sensorwerts
function formatNoiseValue (rawValue: string):number {
  const firstFourDigits = rawValue.slice(0, 4) // Nimm die ersten 4 Zeichen
  const formattedValue = parseFloat(firstFourDigits.slice(0, 2) + '.' + firstFourDigits.slice(2)) // Füge Dezimalpunkt nach zwei Zeichen ein
  return formattedValue
}

// to estimate the data quality a factor in % is calculated to figure out,
//  how much the data points differ from their 200ms timing
export function filterTimeDiffValues (timeDiff:number[]) {
  // Filter the array to remove all differences below 1
  const filteredTimediff = timeDiff.filter(diff => diff >= 1)
  // Optionally, process the filtered data further
  return filteredTimediff
}

// function smoothNoise (data: number[], windowSize: number): number[] {
//   const smoothed: number[] = []

//   for (let i = 0; i < data.length; i++) {
//     const start = Math.max(0, i - Math.floor(windowSize / 2))
//     const end = Math.min(data.length, i + Math.floor(windowSize / 2) + 1)
//     const average =
//       data.slice(start, end).reduce((sum, value) => sum + value, 0) /
//       (end - start)
//     smoothed.push(average)
//   }

//   return smoothed
// };

// Fetch and parse the CSV file
export const loadChartData = async (csvFilePath: string): Promise<void> => {
  const response = await fetch(csvFilePath)
  const csvData = await response.text()

  // eslint-disable-next-line import/no-named-as-default-member
  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      result.data.forEach((row: any) => {
        labels.push(row.timestamp)
        noise.push(formatNoiseValue(row.sensors_ambientData_noise.replace(/\./g, '')
        ))
        disturb.push(parseFloat(row.disturbance_analysisData))
        timediff.push(parseFloat(row.time_diff || '0')) // Default to 0 if empty
      })
      const cleanTimeDiff: number[] = []
      timediff.forEach((diff) => {
        if (diff >= 1) { cleanTimeDiff.push(diff) }
      })
      timediff = cleanTimeDiff
    }
  })
}

// function smoothNoise (data: number[], windowSize: number): number[] {
//   const smoothed: number[] = []

//   for (let i = 0; i < data.length; i++) {
//     const start = Math.max(0, i - Math.floor(windowSize / 2))
//     const end = Math.min(data.length, i + Math.floor(windowSize / 2) + 1)
//     const average =
//       data.slice(start, end).reduce((sum, value) => sum + value, 0) /
//       (end - start)
//     smoothed.push(average)
//   }

//   return smoothed
// };

// Fetch and parse the CSV file
export const loadCleanChartData = async (csvFilePath: string): Promise<void> => {
  const response = await fetch(csvFilePath)
  const csvData = await response.text()

  // eslint-disable-next-line import/no-named-as-default-member
  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      result.data.forEach((row: any) => {
        labels.push(row.timestamp)
        noise.push(formatNoiseValue(row.sensors_ambientData_noise.replace(/\./g, '')
        ))
        disturb.push(parseFloat(row.disturbance_analysisData))
        timediff.push(parseFloat(row.time_diff || '0')) // Default to 0 if empty
      })
      const cleanTimeDiff: number[] = []
      timediff.forEach((diff) => {
        if (diff >= 1) { cleanTimeDiff.push(diff) }
      })
      timediff = cleanTimeDiff
    }
  })
}

// Export chart data and options (initially empty; will be filled after loading the CSV)
export const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: 'Lautstärke (Noise)',
      data: noise,
      borderColor: '#42a5f5',
      backgroundColor: '#42a5f5',
      fill: true,
      tension: 0.8,
      yAxisID: 'y-noise'
    },
    {
      label: 'Störfaktor (Disturbance)',
      data: disturb,
      borderColor: '#ff9800',
      backgroundColor: '#ff9800',
      fill: false,
      tension: 0.2,
      yAxisID: 'y-disturbance'
    },
    {
      label: 'time_diff',
      backgroundColor: '#fdctf',
      borderColor: '#C9C9C9',
      data: timediff,
      fill: false,
      tension: 1,
      yAxisID: 'y-timediff'
    }
  ]
}

export const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true // Enable zooming with the mouse wheel
        },
        pinch: {
          enabled: true // Enable zooming with touch gestures
        },
        mode: 'x' // Allow zooming in both directions
      },
      pan: {
        enabled: true, // Enable panning
        mode: 'xy' // Allow panning in both directions
      }
    },
    title: {
      display: true,
      text: 'Lautstärke und Störfaktor'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timestamp'
      }
    },
    'y-noise': {
      type: 'linear',
      position: 'left', // Noise scale on the left
      title: {
        display: true,
        text: 'Lautstärke (Geräuschkulisse)'
      },
      grid: {
        drawOnChartArea: true // Show grid lines for the noise Y-axis
      }
    },
    'y-disturbance': {
      type: 'linear',
      position: 'right', // Disturbance scale on the right
      title: {
        display: true,
        text: 'Störfaktor (Disturbance)'
      },
      grid: {
        drawOnChartArea: false // Disable grid lines for the disturbance Y-axis
      }
    },
    'y-timediff': {
      type: 'linear',
      position: 'right', // Disturbance scale on the right
      title: {
        display: true,
        text: 'Zeitunterschied'
      },
      grid: {
        drawOnChartArea: false // Disable grid lines for the disturbance Y-axis
      }
    }
  }
}
