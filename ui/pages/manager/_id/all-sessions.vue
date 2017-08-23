<template>
    <div>
        <b-table striped hover :items="sessions" :fields="fields">
            <template slot="session name" scope="item">
                {{item.name}}
            </template>
            <template slot="actions" scope="item">
                <b-btn size="sm" :href="'/session/' +  item.item._id + '/view'">detail</b-btn>
            </template>
        </b-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
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
            this.sessions = (await this.$axios.get('manager-of/' + this.$route.params.id)).data.managerOf
        },

    }
}
</script>