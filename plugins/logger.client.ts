import { pino } from 'pino'

export default defineNuxtPlugin(() => {
  const logger = pino({
    browser: {
      asObject: true // JSON-Format für Logs im Browser
    },
    level: 'debug' // Logging-Level
  })

  return {
    provide: {
      logger // $logger global verfügbar machen
    }
  }
})
