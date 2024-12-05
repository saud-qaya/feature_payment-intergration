// Export data from CSV,

const data = {
  labels: [
    '16.10.24 09:50.123',
    '16.10.24 09:50.143',
    '16.10.24 09:50.166',
    '16.10.24 09:50.213',
    '16.10.24 09:50.199'
  ],
  datasets: [
    {
      label: 'Lautstärke (sensors_ambientData_noise)',
      backgroundColor: '#42a5f5',
      borderColor: '#1e88e5',
      data: [
        34.8861247388139, 34.8861247388139, 34.8861247388139, 38.0076076494897,
        38.0076076494897
      ],
      fill: false
    },
    {
      label: 'Störfaktor (Mindboost Value)',
      backgroundColor: '#ffca28',
      borderColor: '#ff9800',
      data: [17.553421, 17.553421, 18.455361, 18.455361, 18.455361],
      fill: false
    },
    {
      label: 'time_diff',
      backgroundColor: '#fdctf',
      borderColor: '#ff9800',
      data: [143, 166, 213, 199, 214],
      fill: false
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timestamp'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Werte'
      }
    }
  }
}
export {
  // createMicrophoneSource,
  data,
  options
}
