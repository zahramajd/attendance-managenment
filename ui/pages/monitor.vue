<template>
  <section class="container">
    <div>
      <h3> The current QR code is </h3>
      <br>
      <img :src="qrImageSrc">
      <br> {{ token }}
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'monitor',
  data() {
    return {
      qr: 'taban',
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
      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.token}&bgcolor=E9E8E9`
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
