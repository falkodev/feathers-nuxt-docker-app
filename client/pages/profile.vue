<template>
  <v-layout justify-center align-center>
    <v-flex xs12>
      <v-row>
        <v-col cols="12" md="6">
          <Edit :user="userClient" :roles="constants" />
        </v-col>
        <v-col cols="12" md="6" v-if="users.length > 1">
          <v-simple-table height="900px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">First Name</th>
                  <th class="text-left">Last Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user._id">
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td><v-btn @click="loadUserForEdit(user)">Edit</v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>

      <template v-if="doNotDisplayRoles"></template>
      <v-row v-else-if="displayRoles">
        <UploadCSV />
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { setUserInStore } from '~/plugins/helpers'
import { makeFindMixin, makeGetMixin } from 'feathers-vuex'
import Edit from '~/components/profile/Edit.vue'
import UploadCSV from '~/components/admin/UploadCSV'

export default {
  layout: 'logged',

  mixins: [makeFindMixin({ service: 'users' }), makeGetMixin({ service: 'users' })],

  components: {
    Edit,
    UploadCSV,
  },

  data() {
    return {
      userClient: this.$store.state.auth.user || {},
      constants: (this.$store.state.auth.user && this.$store.state.auth.user.roles) || [],
    }
  },

  async beforeMount() {
    if (!this.$store.state.auth.user) {
      const user = await setUserInStore(this.$store)
      this.userClient = user
    }
  },

  async asyncData({ store }) {
    try {
      let constants = []
      let userClient = {}

      if (store.state.auth.user) {
        userClient = store.state.auth.user
      }

      if (userClient.roles && userClient.roles.includes('administrator')) {
        const { data } = await store.dispatch('constants/find')
        constants = data
      } else {
        constants = userClient.roles
      }

      return {
        constants,
        userClient,
      }
    } catch (error) {
      return {
        userClient: {},
        constants: [],
      }
    }
  },

  computed: {
    usersParams() {
      return {
        query: {},
      }
    },
    userId() {
      return this.id
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
    loadUserForEdit(user) {
      this.userClient = user
    },
  },
}
</script>
