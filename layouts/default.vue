<template>
  <div :class="this.$store.state.darkMode ? 'dark-mode' : 'light-mode'">
    <Navbar />
    <b-container class="p-md-5 pt-2 pb-5">
      <Nuxt />
    </b-container>
    <vue-confirm-dialog />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: {
    Navbar,
  },
}
</script>

<style></style>
