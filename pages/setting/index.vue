<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <h1>Halaman Pengaturan</h1>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'Setting',
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
          text: this.$t('Setting'),
          active: true,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('Setting'),
    }
  },
}
</script>
