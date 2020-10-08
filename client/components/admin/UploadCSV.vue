<template>
  <v-flex xs12 sm8 md6>
    <div class="primary--text title">Upload users</div>
    <v-file-input accept=".csv" light outlined show-size label="Click here to add a CSV file" @change="read" />
    <v-btn color="primary" large :loading="loading" :disabled="preview.length <= 7" @click="upload">
      {{ 'upload' | capitalize }}
    </v-btn>
    <br />
    Preview
    <div class="preview" v-html="$options.filters.nl2br(preview)" />
  </v-flex>
</template>

<script>
import { nl2br } from '~/plugins/filters'

export default {
  data: function() {
    return {
      preview: '',
      loading: false,
    }
  },

  methods: {
    read(file) {
      this.preview = 'loading'
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.preview = reader.result
      }
    },

    async upload() {
      this.loading = true
      try {
        const users = this.preview
          .split('\r\n')
          .filter(u => u)
          .map(str => str.split(';'))
          .reduce(
            (acc, cur) =>
              acc.push({
                email: cur[0],
                firstName: cur[1],
                lastName: cur[2],
                password: cur[3],
                roles: cur[4].split(','),
              }) && acc,
            [],
          )

        for (const user of users) {
          await this.$store.dispatch('users/create', user)
        }
        this.$store.dispatch('snackbar/displaySnack', { message: 'Users created with success', color: 'success' })
      } catch (error) {
        const message =
          error.response.data.data.code === 11000
            ? `This email address already exists: ${JSON.parse(error.response.config.data).email}`
            : error.response.data.errors
        this.$store.dispatch('snackbar/displaySnack', {
          message,
          color: 'error',
          timeout: 10000,
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
