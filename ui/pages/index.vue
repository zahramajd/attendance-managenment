<template>
    <div>

        <div class="col-lg-6">
            <br>
            <b-form-input v-model="device_name" type="text" placeholder="Enter the device name"></b-form-input>
            <br>
            <b-btn @click="newDev">New Device</b-btn>
        </div>
        <div class="col-lg-6">
            <br>
            <b-form-input v-model="first_name" type="text" placeholder="Enter the user first name"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="last_name" type="text" placeholder="Enter the user last name"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="username" type="text" placeholder="Enter the username"></b-form-input>
            <br>

            <b-btn @click="newUser">New User</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            pets: [],
            text: '',
            device_name: '',
            first_name: '',
            last_name: '',
            username: ''
        }
    },
    mounted() {
        this.getPets()
    },
    methods: {
        async getPets() {
            this.pets = (await this.$axios.get('pets')).data
        },
        async newDev() {
            await this.$axios.post('new_dev', {
                name: this.device_name
            })
            //   await this.getPets()
        },
        async newUser() {
            await this.$axios.post('new_user', {
                first_name: this.first_name,
                last_name: this.last_name,
                username: this.username
            })
        },
    }
}
</script>