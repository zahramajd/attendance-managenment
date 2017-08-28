<template>
    <div>
        <br>
        <b-card :title="device.name" :sub-title="device.secret"> </b-card>
    </div>
</template>

<script>
export default {

    data() {
        return {
            device: {}
        }
    },
    methods: {
        async load() {
            this.device = await this.$axios.$get('devices/' + this.$route.params.id + '/view')
        }
    },
    async mounted() {
        await this.load()
    },
}
</script>
