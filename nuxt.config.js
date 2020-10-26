import colors from 'vuetify/es5/util/colors'
import { config } from './config'

/* содержимое config.js:
export const config = { // мои параметры          // значения с которыми у вас всё будет работать на локальной машине
  backendURL: 'http://83.246.145.119:4000',       // 'http://localhost:4000'
  frontendURL: 'http://83.246.145.119:3000',      // 'http://localhost:3000'
  localIP: '192.168.1.69',                        // 'localhost'
}
*/

export default {
  env: {
    backendURL: config.backendURL,
    frontendURL: config.frontendURL,
  },
  /*
   ***frontend server***
   */
  server: {
    port: 3000,
    host: config.localIP, // local ip
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Pong.io',
    title: 'Pong.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // mode: 'spa',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
