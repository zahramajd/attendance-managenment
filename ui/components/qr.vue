<template>
    <div class="container">
        <span v-html="qrImageSVG"></span>
        <br> {{ token }}
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
import totpToken from 'otplib/core/totpToken'
import qrImage from 'qr-image'

export default {
    data() {
        return {
            token: ''
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
    mounted() {
        this.interval = setInterval(() => {
            this.token = totpToken(this.secret, { step: 30 })
        }, 1000)
    },
    destroy() {
        clearInterval(this.interval)
    },
    computed: {
        // qrImageSrc() {
        //     return `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}x${this.size}&data=${this.token}&bgcolor=${this.bgColor}`
        // }
        qrImageSVG() {
            return qrImage.imageSync(this.token, { type: 'svg' })
        }
    }
}
</script>