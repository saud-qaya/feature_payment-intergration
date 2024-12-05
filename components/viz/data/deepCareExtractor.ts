import { extractAudioData } from './extractAudioData'

const labels: string[] = []
const noise: number[] = []

// Funktion zum Laden der Daten und Initialisieren der Chart-Daten
export const loadChartData = async (csvFilePath: string): Promise<void> => {
  const audioData = await extractAudioData(csvFilePath)

  audioData.forEach((row:any) => {
    labels.push(row.timestamp)
    noise.push(row.sensors_ambientData_noise)
  })
}

await loadChartData('/audioData.csv')
