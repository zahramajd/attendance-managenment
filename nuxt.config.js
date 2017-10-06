module.exports = {
  srcDir: 'ui',
  mode: 'spa',
  loadingIndicator: {
    // https://nuxtjs.org/api/configuration-loading-indicator
    name: 'pulse'
  },
  manifest: {
    name: 'Attendee'
  },
  loading: {
    color: '#3B8070'
  },
  build: {},
  css: [
    '~/assets/sass/bootstrap.scss',
    '~/assets/sass/app.scss'
  ],
  modules: [
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/meta',
  ],
  proxy: [
    'http://localhost:4000/api'
  ],
  plugins: [
    '~/plugins/chart'
  ]
}
