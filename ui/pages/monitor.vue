<template>
  <div class="container">
    <h2 v-html="title" />
    <qr class="qr" :secret="secret" />
  </div>
</template>

<script>
import qr from "~/components/qr";

export default {
  layout: "monitor",
  components: {
    qr
  },
  computed: {
    title() {
      return decodeURIComponent(
        this.$route.query.title || "کد زیر را اسکن کنید "
      );
    },
    secret() {
      return this.$route.query.secret || "r";
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;
  overflow: hidden;
}

.qr {
  width: 60vh;
}
</style>
