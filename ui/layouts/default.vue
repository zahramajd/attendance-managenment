<template>
  <div id="app" dir="ltr">
    <b-navbar toggleable variant="primary" type="dark">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
        <span>Atendee</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/users" v-if="$store.getters.accessUsers">کاربران</b-nav-item>
          <b-nav-item to="/sessions" v-if="$store.getters.accessSessions">درس‌ها</b-nav-item>
          <b-nav-item to="/devices" v-if="$store.getters.accessDevices">دستگاه‌ها</b-nav-item>
          <b-nav-item to="/logs" v-if="$store.getters.accessLogs">گزارش‌ها</b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown right v-if="$store.state.user">
            <!-- Using button-content slot -->
            <template slot="button-content">
              {{ $store.state.user.username }}
            </template>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>

    </b-navbar>

    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      this.$router.push('/login')
      this.$store.commit('SET_USER', null)
    }
  }
}
</script>

<style>

</style>
