<template>
    <div class="container">
        <span v-html="qrImageSVG"></span>
        <br> {{ token }}
        <br> {{ qrData }}
    </div>
</template>

<style scoped>
.container {
    text-align: center;
    display: block;
    padding: 5px;
}

img {
    width: 100%;
    height: 100%;
}
</style>

<script>
import { totpToken } from 'otplib/core'
import qrImage from 'qr-image'
import crypto from 'crypto'

export default {
    data() {
        return {
            token: '',
            endpoint: 'http://localhost:3000'
        }
    },
    props: {
        secret: String,
        bgColor: {
            type: String,
            default: 'white'
        },
        size: {
            type: Number,
            default: 200
        }
    },
    async mounted() {
        const ip = await this.$axios.$get('ip')
        this.endpoint = 'http://' + ip + ':3000'
        this.interval = setInterval(() => {
            this.token = totpToken(this.secret, { step: 30, crypto })
        }, 1000)
        console.log('token', this.token)

    },
    destroy() {
        clearInterval(this.interval)
    },
    computed: {

        qrData() {
            return this.token
        },
        qrImageSVG() {
            // We add current page URL to QR code so app can discover it's server without config :D

            return qrImage.imageSync(JSON.stringify(this.qrData), { type: 'svg' })
        }
    }
}
</script>