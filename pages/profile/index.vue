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
          text: 'Beranda',
          to: '/',
        },
        {
          text: 'Profil',
          active: true,
        },
      ],
    }
  },
  head: {
    title: 'Profil Pengguna',
    meta: [
      {
        hid: 'profile',
        name: 'profile',
        content: 'Halaman profil pengguna',
      },
    ],
  },
}
</script>
