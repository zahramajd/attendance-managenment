<template>
    <div>
    
        <b-table striped hover :items="logs" :fields="fields">
            <template slot="action type" scope="item">
                {{item.type}}
            </template>
            <template slot="device id" scope="item">
                {{item.device}}
            </template>
            <template slot="session id" scope="item">
                {{item.session}}
            </template>
            <template slot="user id" scope="item">
                {{item.user}}
            </template>
        </b-table>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: '',
            device_id: '',
            logs: [],
            fields: {
                type: {
                    label: 'action type',
                },
                device: {
                    label: 'device id',
                },
                session: {
                    label: 'session id'
                },
                user: {
                    label: 'user id'
                }
            },

        }
    },
    async mounted() {
        await this.getLogs()
    },
    methods: {
        async getLogs() {
            this.logs = (await this.$axios.get('logs')).data
        }
    }
}
</script>