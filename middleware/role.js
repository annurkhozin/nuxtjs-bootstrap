export default function ({ route, app }) {
  return app.$axios
    .$get('/api/user-role?menu=' + route.query.menu)
    .then((resp) => {
      const roles = resp.map((a) => a.module_name)
      app.store.commit('SET_ROLES', roles)
    })
}
