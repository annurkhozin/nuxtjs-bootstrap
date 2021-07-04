import Vue from 'vue'
const demoAccount = {
  alert(AlertDemoTitle, AlertDemoContent) {
    Vue.$confirm({
      title: AlertDemoTitle,
      message: AlertDemoContent,
      button: {
        yes: 'Oke',
      },
    })
  },
}

export default demoAccount
