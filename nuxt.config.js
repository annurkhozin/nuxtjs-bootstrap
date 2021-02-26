export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  globalName: 'myApp',
  globals: {
    id: (globalName) => `${globalName}`,
    nuxt: (globalName) => `$${globalName}`,
    // context: globalName => `__${globalName.toUpperCase()}__`,
    // pluginPrefix: globalName => globalName,
    // readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
    // loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
  },
  server: {
    host: '0.0.0.0', // default: localhost
    port: 8000, // default: 3000
  },

  loading: {
    color: '#4eb883',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hello, Welcome back',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'author', name: 'author', content: 'Nur Khozin' },
      { hid: 'author', name: 'author', content: 'annurkhozin@gmail.com' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // {src: "lokasi script.js"}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/confirm-dialog.js',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://127.0.0.1:3000', // Used as fallback if no runtime config is provided
    proxy: true, // Can be also an object with default options
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: { '^/api/': '/v1/' },
    },
  },

  auth: {
    strategies: {
      //Method login yang digunakan
      local: {
        token: {
          property: 'token',
          required: true,
          maxAge: 60 * 60 * 24 * 7, // seminggu(*7)
          type: '',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          //untuk login pada bagian url, masukkan url login dari Backend API
          //SEDANGKAN PROPERTYNAME ADALAH PROPERTY YANG INGIN KITA AMBIL VALUENYA
          //DALAM HAL INI, LOGIN MENGHARAPKAN TOKEN, SEDANGKAN PADA API KITA ME-RETURN TOKEN DI DALAM OBJECT DATA
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
  },

  //Middleware untuk mengecek sudah login atau belum, set global
  router: {
    middleware: ['auth'],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '/script/',
    babel: {
      compact: true,
    },
  },
}
