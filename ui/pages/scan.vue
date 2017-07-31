<template>
    <div>
        <!-- Pets: {{ pets.map(p => p.name) }} -->
    
        <div class="col-lg-6">
            <br>
            <b-form-input v-model="otp" type="text" placeholder="Enter the OTP"></b-form-input>
            <br>
    
            <br>
            <b-form-input v-model="username" type="text" placeholder="Enter the username"></b-form-input>
            <br>
    
            <b-btn @click="verifyOTP">Send</b-btn>
            <br>
            <pre dir="ltr">{{JSON.stringify(device, undefined, 4)}}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            otp: '',
            username: '',
            device: {},
        }
    },

    methods: {
        async verifyOTP() {
            const res = await this.$axios.post('otp/verify', {
                otp: this.otp,
                username: this.username
            })

            this.device = res.data.device
            console.log(this.device)
        }
    }
}
</script>