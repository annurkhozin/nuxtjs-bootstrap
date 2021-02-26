<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <h1>Home</h1>
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
  data() {
    return {
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
}
</script>

<style></style>
