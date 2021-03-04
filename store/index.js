export const state = () => ({
  darkMode: process.server
    ? false
    : localStorage.getItem('darkMode') === 'true'
    ? Boolean(true)
    : Boolean(false),
  showSidebar: process.server
    ? false
    : localStorage.getItem('showSidebar') === 'true'
    ? Boolean(true)
    : Boolean(false),
})

export const mutations = {
  //MUTATION UNTUK MENGUBAH STATE DI ATAS
  SET_BG_MODE(state, payload) {
    state.darkMode = payload
  },
  SET_SIDEBAR(state, payload) {
    state.showSidebar = payload
  },
}
