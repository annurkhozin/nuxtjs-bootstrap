export const state = () => ({
  darkMode:
    localStorage.getItem('darkMode') === 'true'
      ? Boolean(true)
      : Boolean(false),
  showSidebar:
    localStorage.getItem('showSidebar') === 'true'
      ? Boolean(true)
      : Boolean(false),
  sidebarMenu:
    localStorage.getItem('sidebarMenu') === 'true'
      ? Boolean(true)
      : Boolean(false),
  dialogMenu:
    localStorage.getItem('dialogMenu') === 'false'
      ? Boolean(false)
      : Boolean(true),
})

export const mutations = {
  //MUTATION UNTUK MENGUBAH STATE DI ATAS
  SET_BG_MODE(state, payload) {
    state.darkMode = payload
  },
  SET_SIDEBAR(state, payload) {
    state.showSidebar = payload
  },
  SET_SIDEBAR_MENU(state, payload) {
    state.sidebarMenu = payload
  },
  SET_DIALOG_MENU(state, payload) {
    state.dialogMenu = payload
  },
}

//export const actions = {
//nuxtServerInit({ commit }, context) {
//console.log(this.state.showSidebar)
//},
//}
