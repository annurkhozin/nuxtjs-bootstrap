<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <b-alert
      show
      variant="success"
      dismissible
      fade
      @dismissed="showDismissibleAlert = false"
      >Halo {{ nama_user_login }}. Selamat datang kembali</b-alert
    >
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
          text: 'Beranda',
          active: true,
        },
      ],
    }
  },
  head: {
    title: 'Beranda',
    meta: [
      {
        hid: 'home',
        name: 'home',
        content: 'Halaman utama admin sistem',
      },
    ],
  },
  created() {
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
