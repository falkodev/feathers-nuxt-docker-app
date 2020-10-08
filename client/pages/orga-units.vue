<template>
  <v-layout justify-center align-center>
    <v-flex xs12>
      <v-row>
        <v-col cols="12" md="6">
          <Edit :item="item" v-if="item" @item-saved="refresh" />
        </v-col>
        <v-col cols="12" md="6">
          <v-btn color="primary" @click="loadEdit({})">Create</v-btn>
          <v-simple-table height="900px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Address</th>
                  <th class="text-left">Action</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="unit in filteredOrgaUnits" :key="unit._id">
                  <td>{{ unit.name }}</td>
                  <td>{{ unit.mainAddress.street }} {{ unit.mainAddress.city }} {{ unit.mainAddress.country }}</td>
                  <td><v-btn @click="loadEdit(unit)">Edit</v-btn></td>
                  <td>
                    <v-btn
                      color="pink"
                      :dark="!unit._programs.total"
                      large
                      @click="dialogRemove(unit)"
                      :disabled="!!unit._programs.total"
                    >
                      Remove
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-flex>

    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.mdAndDown">
      <v-card>
        <v-container fluid grid-list-lg>
          <v-flex xs12>
            <v-card-title class="headline">
              Remove {{ selectedItem.name }} organization unit?
              <v-icon class="align--right" @click="dialog = false">
                mdi-close-circle-outline
              </v-icon>
            </v-card-title>
            <v-card-actions class="justify">
              <v-btn x-large color="black" @click="dialog = false" class="white--text">
                No
              </v-btn>
              <v-btn x-large color="pink" @click="remove" :loading="loading" class="white--text">
                Yes
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { makeFindMixin, makeGetMixin, models } from 'feathers-vuex'
import Edit from '~/components/admin/EditOrgaUnit.vue'

export default {
  layout: 'logged',

  mixins: [makeFindMixin({ service: 'orga-units', watch: true }), makeGetMixin({ service: 'orga-units' })],

  components: {
    Edit,
  },

  data() {
    const defaultItem = {
      name: '',
      description: '',
      bankAccount: '',
      mainAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
        building: '',
        floor: '',
        department: '',
      },
      invoiceAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
        building: '',
        floor: '',
        department: '',
      },
    }
    return {
      dialog: false,
      loading: false,
      item: defaultItem,
      selectedItem: defaultItem,
    }
  },

  computed: {
    orgaUnitsParams() {
      return {
        query: {},
        qid: 'mainOrgaUnits',
      }
    },
    orgaUnitId() {
      return this.item._id
    },
    filteredOrgaUnits() {
      return this.orgaUnits.filter(unit => unit)
    },
  },

  methods: {
    loadEdit(item) {
      this.item = item
    },
    refresh() {
      this.findOrgaUnits()
    },
    dialogRemove(item) {
      this.dialog = true
      this.selectedItem = item
    },
    async remove() {
      try {
        this.loading = true
        const item = new models.api.OrgaUnit(this.selectedItem)
        await item.remove()
        this.refresh()
        this.$store.dispatch('snackbar/displaySnack', { message: 'Item removed', color: 'success' })
      } catch (error) {
        this.$store.dispatch('snackbar/displaySnack', { message: error.message, color: 'error' })
      } finally {
        this.loading = false
        this.dialog = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.align--right {
  margin-left: auto;
}
.justify {
  justify-content: space-evenly;
}
</style>
