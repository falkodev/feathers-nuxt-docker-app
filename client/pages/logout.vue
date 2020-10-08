<template> </template>

<script>
export default {
  mounted() {
    try {
      this.$store.dispatch('auth/logout')
      this.$store.dispatch('snackbar/displaySnack', {
        message: 'You have been successfully logged out',
        color: 'success',
      })
    } catch (error) {
      location.reload()
    } finally {
      this.$router.push('/login')
    }
  },
}
</script>
