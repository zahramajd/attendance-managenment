<template>
    <div>
    
        <b-table striped hover :items="logs" :fields="fields">
            <template slot="types" scope="item">
                {{item.type}}
            </template>
            <template slot="device id" scope="item">
                {{item.device_id}}
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
                    label: 'types',
                },
                device_id: {
                    label: 'device id',
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