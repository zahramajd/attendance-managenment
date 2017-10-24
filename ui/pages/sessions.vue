<template>
    <div>
        <b-table striped hover :items="sessions" :fields="fields">
            <template slot="session name" scope="item">
                {{item.name}}
            </template>
            <template slot="actions" scope="item">
                <b-button-group dir=ltr>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/view'" v-if="$store.getters.viewSessions">مشاهده</b-btn>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/edit'" v-if="$store.getters.editSessions">تغییر</b-btn>
                </b-button-group>
            </template>
        </b-table>
        <div class="col-lg-6">
            <br>
            <b-alert variant="secondary" dismissible :show="no_input_alert">نام درس را وارد کنید</b-alert>
            <b-alert variant="secondary" dismissible :show="showWarn">این درس وجود دارد</b-alert>
            <b-form-input v-model="name" type="text" placeholder="نام درس"></b-form-input>
            <br>

            <b-btn @click="newSession">ایجاد درس</b-btn>
        </div>
    </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      name: "",
      sessions: [],
      fields: {
        name: {
          label: "نام درس"
        },
        actions: {
          label: "عملیات"
        }
      },
      no_input_alert: false,
      showWarn: false
    };
  },
  async mounted() {
    await this.getSessions();
  },
  methods: {
    async getSessions() {
      //  this.sessions = (await this.$axios.get('sessions')).data
      this.sessions = (await this.$axios.$get("user/manager-of")).sessions;
    },
    async newSession() {
      this.showWarn = false;
      if (this.name == "") this.no_input_alert = true;
      else {
        const res = await this.$axios.post("sessions/new", {
          name: this.name
        });
        await this.getSessions();
        if (res.data.result == false) this.showWarn = true;
      }
    }
  }
};
</script>