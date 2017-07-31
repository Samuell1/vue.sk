import Vue from 'vue'
import moment from 'moment'

Vue.filter('truncate', function (text, length = 30, clamp = '...') {
  if (text.length <= length) {
    return text
  }
  return text.substring(0, length) + clamp
})

Vue.filter('placeholder', function (value, placeholder) {
  return value || placeholder || ''
})

Vue.filter('formatDate', function (value, format = 'LLL') {
  return moment(value).format(format)
})

