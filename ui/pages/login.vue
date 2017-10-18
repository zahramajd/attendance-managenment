<template>
    <div>
        <div class="col-lg-6">
            <form @submit.prevent="login">
                <br>
                <b-alert variant="secondary" dismissible :show="no_input_alert">مشخصات کاربری خود را وارد کنید</b-alert>
                <b-form-input v-model="username" type="text" placeholder="Enter username"></b-form-input>
                <br>
                <b-form-input v-model="password" type="text" placeholder="Enter password"></b-form-input>
                <br>
                <b-btn @click="login">Log in</b-btn>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            username: '',
            error: '',
            no_input_alert: false
        }
    },
    methods: {
        async login() {
            if (this.username == '' || this.password == '')
                this.no_input_alert = true
            else {
                try {
                    const res = await this.$axios.post('/login', {
                        password: this.password,
                        username: this.username
                    })
                    this.$router.push('/')
                }
                catch (err) {
                    console.log(err)
                    alert('خطا هنگام ورود')
                }
            }
        }
    }
}
</script>