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
    </div>
</template>

<script>
import totpToken from 'otplib/core/totpToken'
import qr from '~/components/qr'

export default {
    components: { qr },
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
