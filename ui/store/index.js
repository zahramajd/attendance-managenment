export default {
  state: () => ({
    user: {
      roles: []
    }
  }),
  getters: {
    is({ user: { roles: [] } }) {
      return roles => roles.includes(role)
    },
    accessLogs({ user }) {
      return user.role.includes('admin')
    },
    accessSessions({ user }) {
      return user.role.includes('admin') || user.role.includes('manager')
    },
    accessUsers({ user }) {
      return user.role.includes('admin')
    },
    accessDevices({ user }) {
      return user.role.includes('admin')
    },
    editSessions({ user }) {
      return user.role.includes('admin')
    },
    viewSessions({ user }) {
      return user.role.includes('admin') || user.role.includes('manager')
    },
  },
  mutations: {
    SET_USER(state, user) {
      Object.assign(state.user, user)
    }
  }
}
