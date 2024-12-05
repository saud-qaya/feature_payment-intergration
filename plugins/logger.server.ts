import * as fs from 'fs'
import { createGzip } from 'zlib'
import { pino, transport } from 'pino'
import { createTransport } from 'nodemailer'
import { config } from 'dotenv'

export default defineNuxtPlugin(() => {
  // Format the Date in log file name
  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // Monat von 0-11
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  config()
  // Standardwerte für Konfiguration
  const maxFiles = parseInt(process.env.LOG_MAX_FILES || '10') // Maximale Anzahl von Log-Dateien
  const logDirectory = process.env.LOG_DIRECTORY || './logs' // Verzeichnis für Log-Dateien
  const alertThreshold = parseInt(process.env.LOG_ALERT_THRESHOLD || '5') // Warnschwelle für Log-Dateien
  const alertEmail =
    process.env.LOG_ALERT_EMAIL || 'robert.rapp@mindboost.team' // E-Mail-Adresse für Warnungen
  const checkInterval = parseInt(
    process.env.LOG_CHECK_INTERVAL || (30 * 60 * 1000).toString()
  ) // Überwachungsintervall
  const currentDate = getCurrentDate() // Format: 2023-11-27

  // Sicherstellen, dass das Log-Verzeichnis existiert
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true })
  }

  // Transport für Pino
  const pinotransport = transport({
    target: 'pino/file',
    options: {
      destination: `${logDirectory}/app-${currentDate}.log`,
      mkdir: true,
      rotate: {
        interval: '1d', // Log-Rotation täglich
        size: '10M' // Maximalgröße für einzelne Logs
      }
    }
  })

  // Logger erstellen
  const logger = pino(pinotransport)
  // Funktion zur E-Mail-Benachrichtigung
  async function sendAlertEmail (fileCount: number) {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true', // TLS/SSL basierend auf ENV
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const message = {
      from: process.env.SMTP_USER || 'app@mindboost.team',
      to: alertEmail,
      subject: 'Warnung: Hohe Anzahl von Log-Dateien',
      text: `Es wurden heute bereits ${fileCount} Log-Dateien erstellt. Schau es dir bitte mal an.`
    }

    try {
      await transporter.sendMail(message)
      logger.info('Warn-E-Mail wurde erfolgreich gesendet.')
    } catch (error) {
      logger.error('Fehler beim Senden der Warn-E-Mail:', error)
    }
  }

  // Funktion zur Überwachung der Log-Dateien
  function monitorLogs () {
    fs.readdir(logDirectory, (err, files) => {
      if (err) {
        logger.error('Fehler beim Lesen des Log-Verzeichnisses:', err)
        return
      }
      const logFiles = files.filter(file => file.endsWith('.log'))
      logger.info(`Aktuelle Anzahl von Log-Dateien: ${logFiles.length}`)

      if (logFiles.length >= alertThreshold) {
        sendAlertEmail(logFiles.length)
      }

      if (logFiles.length > maxFiles) {
        zipOldLogs(logFiles)
      }
    })
  }
  // Funktion zum Zippen alter Logs
  function zipOldLogs (logFiles: string[]) {
    const filesToZip = logFiles.slice(0, logFiles.length - maxFiles)
    filesToZip.forEach((file) => {
      const inputPath = `${logDirectory}/${file}`
      const outputPath = `${inputPath}.gz`

      const gzip = createGzip()
      const source = fs.createReadStream(inputPath)
      const destination = fs.createWriteStream(outputPath)

      source
        .pipe(gzip)
        .pipe(destination)
        .on('finish', () => {
          fs.unlinkSync(inputPath) // Originaldatei löschen
          logger.info(`Log-Datei wurde erfolgreich gezippt: ${outputPath}`)
        })
        .on('error', (err) => {
          logger.error(`Fehler beim Zippen der Log-Datei ${file}:`, err)
        })
    })
  }

  // Log-Rotation überwachen
  pinotransport.on('drain', () => {
    logger.info('Neue Log-Datei wurde erstellt oder rotiert.')
    monitorLogs()
  })

  // Überwachung alle 30 Minuten ausführen
  setInterval(monitorLogs, checkInterval)

  return {
    provide: {
      logger
    }
  }
})
