<template>
    <div>
        <b-table striped hover :items="sessions" :fields="fields">
            <template slot="session name" scope="item">
                {{item.name}}
            </template>
            <template slot="actions" scope="item">
                <b-button-group>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/view'" v-if="$store.getters.viewSessions">مشاهده</b-btn>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/edit'" v-if="$store.getters.editSessions">تغییر</b-btn>
                </b-button-group>
            </template>
        </b-table>
        <div class="col-lg-6">
            <br>
            <b-alert variant="secondary" dismissible :show="no_input_alert">نام درس را وارد کنید</b-alert>
            <b-form-input v-model="name" type="text" placeholder="نام درس"></b-form-input>
            <br>

            <b-btn @click="newSession">ایجاد درس</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            name: '',
            sessions: [],
            fields: {
                name: {
                    label: 'نام درس',
                },
                actions: {
                    label: 'عملیات'
                }
            },
            no_input_alert: false
        }
    },
    async mounted() {
        await this.getSessions()
    },
    methods: {
        async getSessions() {
            //  this.sessions = (await this.$axios.get('sessions')).data
            this.sessions = (await this.$axios.get('user/' + this.$store.state.user._id + '/manager-of')).data.managerOf
        },
        async newSession() {
            if (this.name == '')
                this.no_input_alert = true
            else {
                await this.$axios.post('sessions/new', {
                    name: this.name,
                })
                await this.getSessions()
            }

        },
    }
}
</script>