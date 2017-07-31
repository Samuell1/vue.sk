import Vue from 'vue'

Vue.mixin({
  methods: {
    truncate (text, length = 30, clamp = '...') {
      if (text.length <= length) {
        return text
      }
      return text.substring(0, length) + clamp
    }
  }
})
