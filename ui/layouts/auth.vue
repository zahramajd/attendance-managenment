<template>
  <div id="app" dir="rtl">
    <b-navbar toggleable variant="primary" type="inverse">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
        <span>Atendee</span>
      </b-link>
  
      <b-nav is-nav-bar>
        <b-nav-item to="/login">Login</b-nav-item>
      </b-nav>
  
    </b-navbar>
  
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<style>

</style>
