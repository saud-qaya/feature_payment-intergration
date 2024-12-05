import Papa from 'papaparse'

// Typdefinitionen für die Daten
interface AudioData {
  timestamp: string
  sensors_ambientData_noise: number
}

// Funktion zum Laden und Extrahieren der CSV-Daten
export const extractAudioData = async (csvFilePath: string): Promise<AudioData[]> => {
  const response = await fetch(csvFilePath)
  const csvData = await response.text()

  const audioData: AudioData[] = []

  // eslint-disable-next-line import/no-named-as-default-member
  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      result.data.forEach((row: any) => {
        // Extrahiere und parse die Daten
        const timestamp = row.timestamp
        const noise = parseFloat(row.sensors_ambientData_noise)

        if (timestamp && !isNaN(noise)) {
          audioData.push({ timestamp, sensors_ambientData_noise: noise })
        }
      })
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => resolve(audioData), 0) // Simuliere async Verarbeitung
  })
}
