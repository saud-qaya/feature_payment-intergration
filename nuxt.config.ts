// @ts-ignore
// import path from 'path'
// @ts-ignore

export default defineNuxtConfig({
  ssr: false,
  devServer: {
    https: {
      key: './cert/localhost.key',
      cert: './cert/localhost.crt'
    }
  },
  runtimeConfig: {
    // Private variables (only available server-side)
    privateKey: process.env.PRIVATE_KEY,
    public: {
      noise_src: '/masking/Quellrauschen_loopbar_+10dB.mp3',
      apiUrl:
        process.env.VUE_APP_BACKEND_HOST_ADDRESS || 'https://b.mindboost.team',

      /* We avoid using m4a because chrome has issues playing it
       *
      forest_src: '/sounds/forest.m4a',
      meadow_src: '/sounds/meadow.m4a',
      tropics_src: '/sounds/tropics.m4a',
      lagoon_src: '/sounds/lagoon.m4a', */

      forest_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.mp3',
      meadow_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.mp3',
      tropics_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.mp3',
      lagoon_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.mp3',

      forest_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.mp3',
      meadow_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.mp3',
      lagoon_48_mp3_src: '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.mp3',
      tropics_48_mp3_src:
        '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.mp3',

      forest_48_flac_src:
        '/sounds/48kHz_15min/MindMusik_15min_48KHz_Forest.flac',
      meadow_48_flac_src:
        '/sounds/48kHz_15min/MindMusik_15min_48KHz_Meadow.flac',
      lagoon_48_flac_src:
        '/sounds/48kHz_15min/MindMusik_15min_48KHz_Lagoon.flac',
      tropics_48_flac_src:
        '/sounds/48kHz_15min/MindMusik_15min_48KHz_Tropics.flac'
    }
  },

  plugins: [
    { src: '~/plugins/AudioVisual.client', mode: 'client' },
    { src: '~/plugins/PiniaPlugin', mode: 'client' },
    {
      src: '~/plugins/vue-video-background.client',
      ssr: false,
      mode: 'client'
    },
    { src: '~/plugins/toastr.client', ssr: false, mode: 'client' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/logger.server', ssr: true, mode: 'server' }, // Registriert den Pino-Logger'
    { src: '~/plugins/logger.client', mode: 'client' } // Registriert den Pino-Logger'
  ],

  app: {
    pageTransition: {
      name: 'slide-right',
      mode: 'out-in'
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.paddle.com/paddle/v2/paddle.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    ['@nuxtjs/eslint-module', { lintOnStart: false }]
  ],

  i18n: {
    strategy: 'prefix',
    locales: ['en', 'de'], // used in URL path prefix
    defaultLocale: 'de', // default locale of your project for Nuxt pages and routings
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },

  css: ['~/assets/css/style.css'],

  vite: {
    // enable big integer literals
    // see: https://stackoverflow.com/a/76802679/10043870
    build: {
      target: ['esnext']
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        supported: {
          bigint: true
        }
      }
    }
  },

  devtools: {
    timeline: {
      enabled: true
    },

    enabled: false
  },

  compatibilityDate: '2024-10-09'
})
