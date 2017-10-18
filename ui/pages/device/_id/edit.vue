<template>
    <div>
        <br>
        <b-card :title="device.name" :sub-title="device.secret">
            <div class="row">
                <div class="col-3">
                    <qr :secret="device.secret" />
                </div>
                <div class="col-8">
                    <pre>{{ JSON.stringify(device, undefined, 8) }}</pre>
                </div>
            </div>
        </b-card>
        <b-btn @click="newSecret">create new secret</b-btn>
    </div>
</template>

<script>
import { totpToken } from 'otplib/core'
import qr from '~/components/qr'

export default {
    middleware: 'auth',
    components: { qr },
    data() {
        return {
            device: {}
        }
    },
    methods: {
        async load() {
            this.device = await this.$axios.$get('devices/' + this.$route.params.id + '/view')
        },
        async newSecret() {
            await this.$axios.get('devices/' + this.$route.params.id + '/secret/refresh')
            await this.load()
        },
    },
    async mounted() {
        await this.load()
    },
}
</script>
