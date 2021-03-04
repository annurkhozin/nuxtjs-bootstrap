<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <b-alert
      show
      variant="success"
      dismissible
      fade
      @dismissed="showDismissibleAlert = false"
      >{{ $t('Hello') }} {{ nama_user_login }} 👋. {{ $t('Welcome_back') }}.
    </b-alert>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'Home',
  auth: true,
  components: {
    Breadcrumb,
  },
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
  head: {
    title: 'Home',
    meta: [
      {
        hid: 'home',
        name: 'home',
        content: 'Halaman utama admin sistem',
      },
    ],
  },
  created() {
    console.log(this)
    this.sidebarMenu(false)
  },
  methods: {
    ...mapMutations(['SET_SIDEBAR']),
    sidebarMenu(payload) {
      this.SET_SIDEBAR(payload)
    },
  },
}
</script>

<style></style>
