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
  roles: [],
})

export const mutations = {
  //mutations untuk mengubah state di atas
  SET_BG_MODE(state, payload) {
    localStorage.setItem('darkMode', payload)
    state.darkMode = payload
  },
  SET_SIDEBAR(state, payload) {
    localStorage.setItem('showSidebar', payload)
    state.showSidebar = payload
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
}
