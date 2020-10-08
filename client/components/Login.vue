<template>
  <v-card flat width="100%" light>
    <v-form ref="form" @submit.prevent="login">
      <v-container :class="{ 'container--small': !modal }">
        <v-flex class="flex--centered">
          <v-card-title class="justify-center">
            <span class="headline font-weight-bold grey--text text--darken-1">
              {{ 'login' | capitalize }}
            </span>
            <v-icon v-show="modal" class="icon-align--right outlined" small @click="close">
              close
            </v-icon>
          </v-card-title>

          <v-card-text>
            <v-text-field
              ref="email"
              v-model="email"
              type="email"
              :disabled="emailDisabled"
              :label="'email' | capitalize"
              :rules="[rules.required]"
              :error-messages="emailErrors"
              color="primary"
              required
            />

            <v-text-field
              v-model="password"
              :label="'password' | capitalize"
              type="password"
              :rules="[rules.required]"
              color="primary"
              required
            />
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-layout column>
              <v-btn outlined type="submit" class="login" color="primary" large :loading="loading">
                {{ 'log in' | capitalize }}
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { capitalize } from '~/plugins/filters'

export default {
  props: {
    modal: Boolean,
    close: {
      type: Function,
      default /* istanbul ignore next */: _ => _,
    },
    userEmail: {
      type: String,
      default: '',
    },
  },

  data: function() {
    return {
      email: this.userEmail || '',
      emailDisabled: !!this.userEmail,
      password: '',
      loading: false,
      rules: {
        required: v => !!v || capitalize('required'),
      },
      emailErrors: [],
    }
  },

  methods: {
    async login(user) {
      try {
        this.loading = true
        await this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          email: this.email,
          password: this.password,
        })
        this.$router.push('/')
        this.$store.dispatch('snackbar/displaySnack', { message: 'Logged in successfully', color: 'success' })
      } catch (e) {
        this.$store.dispatch('snackbar/displaySnack', { message: capitalize('error'), color: 'error' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
@import '~assets/scss/colors.scss';

.v-card__text {
  padding: 0;
}

.login {
  margin-bottom: 30px;
}

@media (min-width: $medium) {
  .flex--centered {
    padding-left: 4%;
  }
  .v-card .container.container--small {
    width: 50%;
  }
}
</style>
