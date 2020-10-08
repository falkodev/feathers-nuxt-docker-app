<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-text-field v-model="name" :rules="nameRules" label="Name" required />
      </v-row>
      <v-row>
        <v-text-field v-model="description" label="Description" />
      </v-row>
      <v-row>
        <v-text-field
          v-model="bankAccount"
          label="Bank Account"
          v-mask="'AA## #### #### #### ##A# #######'"
          placeholder="FR02 1234 1234 1234 12A1 1234567"
        />
      </v-row>

      <v-row class="mt-5">
        Main address
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressStreet" label="Street" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressCity" label="City" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressPostCode" label="Post Code" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressCountry" label="Country" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressBuilding" label="Building" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressFloor" label="Floor" />
      </v-row>
      <v-row>
        <v-text-field v-model="mainAddressDepartment" label="Department" />
      </v-row>

      <v-row class="mt-5">
        Invoice address
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressStreet" label="Street" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressCity" label="City" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressPostCode" label="Post Code" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressCountry" label="Country" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressBuilding" label="Building" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressFloor" label="Floor" />
      </v-row>
      <v-row>
        <v-text-field v-model="invoiceAddressDepartment" label="Department" />
      </v-row>

      <v-row align="center">
        <v-btn type="submit" color="primary" dark large :loading="loading" class="ml-auto">
          Save
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mask } from 'vue-the-mask'
import { models } from 'feathers-vuex'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({
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
      }),
    },
  },

  directives: {
    mask,
  },

  data: function() {
    return {
      valid: false,
      loading: false,
      nameRules: [v => !!v || 'Name is required'],
    }
  },

  updated() {
    this.selectedName = this.item.name
    this.selectedDescription = this.item.description
    this.selectedBankAccount = this.item.bankAccount

    this.selectedMainAddressStreet = this.item.mainAddress ? this.item.mainAddress.street : ''
    this.selectedMainAddressCity = this.item.mainAddress ? this.item.mainAddress.city : ''
    this.selectedMainAddressPostCode = this.item.mainAddress ? this.item.mainAddress.postCode : ''
    this.selectedMainAddressCountry = this.item.mainAddress ? this.item.mainAddress.country : ''
    this.selectedMainAddressBuilding = this.item.mainAddress ? this.item.mainAddress.building : ''
    this.selectedMainAddressFloor = this.item.mainAddress ? this.item.mainAddress.floor : ''
    this.selectedMainAddressDepartment = this.item.mainAddress ? this.item.mainAddress.department : ''

    this.selectedInvoiceAddressStreet = this.item.invoiceAddress ? this.item.invoiceAddress.street : ''
    this.selectedInvoiceAddressCity = this.item.invoiceAddress ? this.item.invoiceAddress.city : ''
    this.selectedInvoiceAddressPostCode = this.item.invoiceAddress ? this.item.invoiceAddress.postCode : ''
    this.selectedInvoiceAddressCountry = this.item.invoiceAddress ? this.item.invoiceAddress.country : ''
    this.selectedInvoiceAddressBuilding = this.item.invoiceAddress ? this.item.invoiceAddress.building : ''
    this.selectedInvoiceAddressFloor = this.item.invoiceAddress ? this.item.invoiceAddress.floor : ''
    this.selectedInvoiceAddressDepartment = this.item.invoiceAddress ? this.item.invoiceAddress.department : ''
  },

  computed: {
    name: {
      get() {
        return this.item.name
      },
      set(v) {
        this.selectedName = v
      },
    },
    description: {
      get() {
        return this.item.description
      },
      set(v) {
        this.selectedDescription = v
      },
    },
    bankAccount: {
      get() {
        return this.item.bankAccount
      },
      set(v) {
        this.selectedBankAccount = v
      },
    },
    mainAddressStreet: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.street : ''
      },
      set(v) {
        this.selectedMainAddressStreet = v
      },
    },
    mainAddressCity: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.city : ''
      },
      set(v) {
        this.selectedMainAddressCity = v
      },
    },
    mainAddressPostCode: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.postCode : ''
      },
      set(v) {
        this.selectedMainAddressPostCode = v
      },
    },
    mainAddressCountry: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.country : ''
      },
      set(v) {
        this.selectedMainAddressCountry = v
      },
    },
    mainAddressBuilding: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.building : ''
      },
      set(v) {
        this.selectedMainAddressBuilding = v
      },
    },
    mainAddressFloor: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.floor : ''
      },
      set(v) {
        this.selectedMainAddressFloor = v
      },
    },
    mainAddressDepartment: {
      get() {
        return this.item.mainAddress ? this.item.mainAddress.department : ''
      },
      set(v) {
        this.selectedMainAddressDepartment = v
      },
    },
    invoiceAddressStreet: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.street : ''
      },
      set(v) {
        this.selectedInvoiceAddressStreet = v
      },
    },
    invoiceAddressCity: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.city : ''
      },
      set(v) {
        this.selectedInvoiceAddressCity = v
      },
    },
    invoiceAddressPostCode: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.postCode : ''
      },
      set(v) {
        this.selectedInvoiceAddressPostCode = v
      },
    },
    invoiceAddressCountry: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.country : ''
      },
      set(v) {
        this.selectedInvoiceAddressCountry = v
      },
    },
    invoiceAddressBuilding: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.building : ''
      },
      set(v) {
        this.selectedInvoiceAddressBuilding = v
      },
    },
    invoiceAddressFloor: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.floor : ''
      },
      set(v) {
        this.selectedInvoiceAddressFloor = v
      },
    },
    invoiceAddressDepartment: {
      get() {
        return this.item.invoiceAddress ? this.item.invoiceAddress.department : ''
      },
      set(v) {
        this.selectedInvoiceAddressDepartment = v
      },
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const item = new models.api.OrgaUnit({
            ...this.item,
            name: this.selectedName,
            description: this.selectedDescription,
            bankAccount: this.selectedBankAccount,
            mainAddress: {
              street: this.selectedMainAddressStreet,
              city: this.selectedMainAddressCity,
              postCode: this.selectedMainAddressPostCode,
              country: this.selectedMainAddressCountry,
              building: this.selectedMainAddressBuilding,
              floor: this.selectedMainAddressFloor,
              department: this.selectedMainAddressDepartment,
            },
            invoiceAddress: {
              street: this.selectedInvoiceAddressStreet,
              city: this.selectedInvoiceAddressCity,
              postCode: this.selectedInvoiceAddressPostCode,
              country: this.selectedInvoiceAddressCountry,
              building: this.selectedInvoiceAddressBuilding,
              floor: this.selectedInvoiceAddressFloor,
              department: this.selectedInvoiceAddressDepartment,
            },
          })
          item._id ? await item.patch() : await item.create()
          this.$refs.form.reset()
          this.$store.dispatch('snackbar/displaySnack', { message: 'Item saved', color: 'success' })
          this.$emit('item-saved')
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
