<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-text-field v-model="firstName" :rules="nameRules" label="First name" required />
      </v-row>
      <v-row>
        <v-text-field v-model="lastName" :rules="nameRules" label="Last name" required />
      </v-row>
      <v-row>
        <v-text-field v-model="email" :rules="emailRules" label="Email" required />
      </v-row>

      <template v-if="doNotDisplayRoles"></template>
      <template v-else-if="displayRoles">
        <v-row v-for="(role, index) in roles" :key="index">
          <v-switch
            color="primary"
            :label="role"
            v-model="userRoles"
            :rules="roleRules"
            :value="role"
            @change="selectRoles"
            data-type="role"
            type="userRoles"
          />
        </v-row>
      </template>

      <v-row align="center">
        <v-btn type="submit" color="primary" dark large :loading="loading" class="ml-auto">
          Save
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { models } from 'feathers-vuex'

export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        email: '',
        lastName: '',
        firstName: '',
        roles: [],
      }),
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },

  data: function() {
    return {
      valid: false,
      loading: false,
      selectedEmail: this.user.email,
      selectedRoles: this.user.roles,
      selectedLastName: this.user.lastName,
      selectedFirstName: this.user.firstName,
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail is not valid'],
      roleRules: [v => this.selectedRoles.length > 0 || 'Select at least one role'],
    }
  },

  computed: {
    email: {
      get() {
        return this.user.email
      },
      set(v) {
        this.selectedEmail = v
      },
    },
    userRoles: {
      get() {
        return this.user.roles
      },
      set(v) {
        return v
      },
    },
    lastName: {
      get() {
        return this.user.lastName
      },
      set(v) {
        this.selectedLastName = v
      },
    },
    firstName: {
      get() {
        return this.user.firstName
      },
      set(v) {
        this.selectedFirstName = v
      },
    },
    doNotDisplayRoles() {
      const userRoles = this.$store.state.auth.user && this.$store.state.auth.user.roles
      return userRoles && userRoles.includes('participant') && userRoles.length === 1
    },
    displayRoles() {
      return this.$store.state.auth.user && this.$store.state.auth.user.roles
    },
  },

  methods: {
    selectRoles() {
      this.$nextTick(() => {
        const selectedRoles = this.$refs.form.inputs.reduce((acc, cur) => {
          if (cur.$vnode.data.attrs.type === 'userRoles' && cur.$el.classList.contains('v-input--is-label-active')) {
            acc.push(cur.$vnode.componentOptions.propsData.value)
          }
          return acc
        }, [])
        this.selectedRoles = selectedRoles
      })
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const user = new models.api.User({
            ...this.user,
            email: this.selectedEmail,
            roles: this.selectedRoles,
            lastName: this.selectedLastName,
            firstName: this.selectedFirstName,
          })
          await user.patch()
          this.$store.dispatch('snackbar/displaySnack', { message: 'User updated', color: 'success' })
        } catch (error) {
          this.$store.dispatch('snackbar/displaySnack', { message: error.message, color: 'error' })
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
