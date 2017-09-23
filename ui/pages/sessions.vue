<template>
    <div>
        <b-table striped hover :items="sessions" :fields="fields">
            <template slot="session name" scope="item">
                {{item.name}}
            </template>
            <template slot="actions" scope="item">
                <b-button-group>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/view'">view</b-btn>
                    <b-btn size="sm" :to="'/session/' +  item.item._id + '/edit'">edit</b-btn>
                </b-button-group>
            </template>
        </b-table>
        <div class="col-lg-6">
            <br>
            <b-form-input v-model="name" type="text" placeholder="enter the session name"></b-form-input>
            <br>

            <b-btn @click="newSession">New Session</b-btn>
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
                    label: 'session name',
                },
                actions: {
                    label: 'detail'
                }
            },
        }
    },
    async mounted() {
        await this.getSessions()
    },
    methods: {
        async getSessions() {
            this.sessions = (await this.$axios.get('sessions')).data
        },
        async newSession() {
            await this.$axios.post('sessions/new', {
                name: this.name,
            })
            await this.getSessions()
        },
    }
}
</script>