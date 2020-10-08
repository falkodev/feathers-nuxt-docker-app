import Vue from 'vue'

function capitalize(value) {
  if (!value) return ''
  return (
    value
      .toString()
      .charAt(0)
      .toUpperCase() + value.slice(1)
  )
}

function upper(value) {
  if (!value) return ''
  return value.toString().toUpperCase()
}

function lower(value) {
  if (!value) return ''
  return value.toString().toLowerCase()
}

function nl2br(value) {
  if (!value) return ''
  return value.toString().replace(/\n/g, '<br />\n')
}

Vue.filter('capitalize', capitalize)
Vue.filter('upper', upper)
Vue.filter('lower', lower)
Vue.filter('nl2br', nl2br)

export { capitalize, upper, lower, nl2br }
