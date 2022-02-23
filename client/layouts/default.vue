<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app color="white">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="logged" to="/logout" router exact>
          <v-list-item-action>
            <v-icon color="primary">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else to="/login" router exact>
          <v-list-item-action>
            <v-icon color="primary">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="'Login'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar absolute color="white" elevate-on-scroll :clipped-left="clipped" tile app>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />

      <v-toolbar-title class="primary--text">App</v-toolbar-title>
    </v-app-bar>
    <v-content class="white">
      <v-container>
        <nuxt />
        <snackbar />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app color="white primary--text">
      <span>&copy; {{ year }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: {
    Snackbar,
  },

  computed: {
    logged() {
      return this.$store.state.auth && this.$store.state.auth.payload
    },
    year() {
      return new Date().getFullYear()
    }
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
