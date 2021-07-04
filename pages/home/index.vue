<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <b-alert
      show
      variant="success"
      dismissible
      fade
      @dismissed="showDismissibleAlert = false"
      >{{ $t('Hello') }} {{ nama_user_login }}. {{ $t('Welcome_back') }} 👋.
    </b-alert>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'Home',
  auth: true,
  components: {
    Breadcrumb,
  },
  middleware: ['role'],
  data() {
    return {
      nama_user_login: this.$auth.$state.user.nama,
      breadcrumb: [
        {
          text: this.$t('Home'),
          active: true,
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('Home'),
    }
  },
}
</script>

<style></style>
