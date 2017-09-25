export default {
  state: () => ({
    user: {
      scopes: []
    }
  }),
  getters: {
    is({ user: { scopes: [] } }) {
      return scopes => scopes.includes(scope)
    },
    accessLogs({ user }) {
      return user.scope.includes('admin')
    },
    accessSessions({ user }) {
      return user.scope.includes('admin') || user.scope.includes('manager')
    },
    accessUsers({ user }) {
      return user.scope.includes('admin') || user.scope.includes('manager')
    },
    accessDevices({ user }) {
      return user.scope.includes('admin')
    },
  },
  mutations: {
    SET_USER(state, user) {
      Object.assign(state.user, user)
    }
  }
}
