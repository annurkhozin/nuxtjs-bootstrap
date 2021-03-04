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
          text: 'Beranda',
          to: '/',
        },
        {
          text: 'Pengaturan',
          active: true,
        },
      ],
    }
  },
  head: {
    title: 'Daftar Pengguna',
    meta: [
      {
        hid: 'users',
        name: 'users',
        content: 'Halaman daftar pengguna',
      },
    ],
  },
}
</script>
