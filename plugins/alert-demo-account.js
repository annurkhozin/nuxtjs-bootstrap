import Vue from 'vue'
const demoAccount = {
  alert() {
    Vue.$confirm({
      title: '😥 Akses di batasi.',
      message: `Sayang sekali, kamu tidak bisa melakukan aksi ini, karena akunmu hanya akun DEMO!`,
      button: {
        yes: 'Oke',
      },
      callback: (confirm) => {},
    })
  },
}

export default demoAccount
