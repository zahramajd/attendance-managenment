<template>
    <div>
        <div class="col-lg-6">
            <br>
            <b-form-input v-model="username" type="text" placeholder="Enter username"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="password" type="text" placeholder="Enter password"></b-form-input>
            <br>

            <b-btn @click="login">Log in</b-btn>
            <br>
            <p>{{error}}</p>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            username: '',
            error: ''
        }
    },

    methods: {
        async login() {
            try {
                const res = await this.$axios.post('/api/login', {
                    password: this.password,
                    username: this.username
                })
            }
            catch (err) {
                console.log(err)
                this.error = err
            }
        }
    }
}
</script>