export default {
  state: () => ({
    user: null
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  }
}
