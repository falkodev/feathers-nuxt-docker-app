<template>
  <v-layout justify-center align-center>
    <v-flex xs12>
      <v-row>
        <v-col cols="12">
          <ul v-for="item in filteredOrgaUnits" :key="item._id">
            <li>
              <v-subheader>{{ item.name }}</v-subheader>
              <v-btn
                max-width="200"
                color="primary"
                nuxt
                :to="{
                  name: 'programs-unit-id',
                  params: { id: 'new', unit: item.name, orgaUnit: item },
                }"
                >Create program</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Program</th>
                      <th class="text-left">Action</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="program in item._programs.data" :key="program._id">
                      <td>{{ program.name }}</td>
                      <td>
                        <v-btn
                          nuxt
                          :to="{
                            name: 'programs-unit-id',
                            params: { id: program.name, unit: item.name, program },
                          }"
                          >Edit</v-btn
                        >
                      </td>
                      <td>
                        <v-btn color="pink" dark large @click="dialogRemove(program, item)">Remove</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-flex>
    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.mdAndDown">
      <v-card>
        <v-container fluid grid-list-lg>
          <v-flex xs12>
            <v-card-title class="headline">
              Remove {{ selectedProgram.name }} program?
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
export default {
  mixins: [makeFindMixin({ service: 'orga-units' }), makeGetMixin({ service: 'orga-units' })],

  data() {
    return {
      dialog: false,
      loading: false,
      selectedProgram: {},
      selectedUnit: {},
    }
  },

  computed: {
    orgaUnitsParams() {
      return {
        query: {},
        qid: 'mainOrgaUnits',
      }
    },
    filteredOrgaUnits() {
      return this.orgaUnits.filter(unit => unit)
    },
  },

  methods: {
    refresh() {
      this.findOrgaUnits()
    },
    dialogRemove(program, unit) {
      this.dialog = true
      this.selectedProgram = program
      this.selectedUnit = unit
    },
    async remove() {
      try {
        this.loading = true
        const item = new models.api.Program(this.selectedProgram)
        await item.remove()

        const unit = new models.api.OrgaUnit({
          ...this.selectedUnit,
        })
        const unitClone = unit.clone()
        const _programsIds = unitClone._programsIds.filter(program => program !== item._id)
        const unitUpdated = new models.api.OrgaUnit({
          ...unitClone,
          _programsIds,
        })
        await unitUpdated.patch()
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
li {
  list-style: none;
}
.align--right {
  margin-left: auto;
}
.justify {
  justify-content: space-evenly;
}
.v-btn {
  span {
    height: inherit;
  }
}
</style>
