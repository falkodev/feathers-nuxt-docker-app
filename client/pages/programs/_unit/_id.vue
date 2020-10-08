<template>
  <v-layout justify-center align-center>
    <v-flex xs12>
      <v-row>
        <v-col cols="12" md="6">
          <v-form v-model="valid" ref="form" @submit.prevent="submit">
            <v-container>
              <v-row>
                <v-text-field v-model="name" :rules="nameRules" label="Name" required />
              </v-row>
              <v-row>
                <v-text-field v-model="goal" label="Goal" />
              </v-row>

              <v-row align="center">
                <v-btn type="submit" color="primary" dark large :loading="loading" class="ml-auto">
                  Save
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { makeGetMixin, models } from 'feathers-vuex'
import { capitalize } from '~/plugins/filters'

export default {
  mixins: [makeGetMixin({ service: 'programs' })],

  head() {
    return {
      titleTemplate: `%s - ${this.$route.params.unit}`,
    }
  },

  data() {
    return {
      valid: false,
      loading: false,
      name: '',
      goal: '',
      nameRules: [v => !!v || 'Required'],
    }
  },

  created() {
    if (this.program) {
      this.name = this.program.name
      this.goal = this.program.goal
    }
  },

  computed: {
    programId() {
      return this.$route.params.program && this.$route.params.program._id
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const program = new models.api.Program({
            ...this.program,
            name: this.name,
            goal: this.goal,
          })
          if (this.$route.params.orgaUnit) {
            const programCreated = await program.create()
            const unit = new models.api.OrgaUnit({
              ...this.$route.params.orgaUnit,
            })
            const unitClone = unit.clone()
            let _programsIds = unitClone._programsIds || []
            _programsIds.push(programCreated._id)
            _programsIds = _programsIds.filter(p => p)
            const unitUpdated = new models.api.OrgaUnit({
              ...unitClone,
              _programsIds,
            })
            await unitUpdated.patch()
          } else {
            await program.patch()
          }

          this.$store.dispatch('snackbar/displaySnack', { message: 'Program saved', color: 'success' })
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
