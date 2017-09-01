module.exports = {
  head: {
    titleTemplate: '%s - Vue.sk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue.sk' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600|Roboto Mono' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Dosis:500&text=Vue.js' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  css: [
    {
      src: '~/assets/app.scss',
      lang: 'scss'
    },
    {
      src: 'highlight.js/styles/atelier-cave-light.css',
      lang: 'css'
    }
  ],
  loading: { color: '#0be884' },
  apollo: {
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
    }
  },
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/mixins.js'
  ],
  modules: ['@nuxtjs/apollo'],
  build: {
    vendor: ['highlight.js', 'lang-detector'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
