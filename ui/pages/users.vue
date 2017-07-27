<template>
    <div>
        <!-- Pets: {{ pets.map(p => p.name) }} -->
    
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
    data() {
        return {
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