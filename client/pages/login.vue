<template>
  <v-layout row>
    <login />
  </v-layout>
</template>

<script>
import Login from '~/components/Login'

export default {
  head: {
    titleTemplate: '%s - Login',
  },

  components: {
    Login,
  },
}
</script>
