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
import { setUserInStore } from '~/plugins/helpers'
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: {
    Snackbar,
  },

  computed: {
    year() {
      return new Date().getFullYear()
    }
  },

  async created() {
    await setUserInStore(this.$store)
    if (
      this.items &&
      this.$store.state.auth.user &&
      this.$store.state.auth.user.roles &&
      this.$store.state.auth.user.roles.includes('administrator')
    ) {
      this.items.splice(this.items.length - 1, 0, {
        icon: 'mdi-domain',
        title: 'Organisation Units',
        to: '/orga-units',
      })
      this.items.splice(this.items.length - 1, 0, {
        icon: 'mdi-file-document',
        title: 'Programs',
        to: '/programs',
      })
    }
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile',
        },
        {
          icon: 'mdi-power',
          title: 'Logout',
          to: '/logout',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'App',
    }
  },
}
</script>
