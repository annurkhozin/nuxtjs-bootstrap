<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <h1>Halaman Profil</h1>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'Profile',
  auth: true,
  components: {
    Breadcrumb,
  },

  data() {
    return {
      breadcrumb: [
        {
          text: this.$t('Home'),
          to: 'home',
        },
        {
          text: this.$t('Profile'),
          active: true,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('Profile'),
    }
  },
}
</script>
