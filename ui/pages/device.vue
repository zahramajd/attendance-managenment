<template>
  <section class="container">
    <div>
      <img :src="qrImageSrc" @click="counter++">
      <br> {{ token }}
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'device',
  data() {
    return {
      qr: 'taban',
      counter: 0
    }
  },
  mounted() {
    setInterval(() => this.$store.commit('otp/UPDATE'), 1000)
  },
  computed: {
    ...mapState({
      token: state => state.otp.token
    }),
    qrImageSrc() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.token}`
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
