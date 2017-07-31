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
    
            <b-btn @click="sendOTP">Send</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            otp: '',
            username: ''
        }
    },

    methods: {
        async sendOTP() {
            await this.$axios.post('verifyotp', {
                otp: this.otp,
                username: this.username
            })

        }
    }
}
</script>