<template>
    <div>
    
        <b-table striped hover :items="users" :fields="fields">
            <template slot="first name" scope="item">
                {{item.first_name}}
            </template>
            <template slot="last name" scope="item">
                {{item.last_name}}
            </template>
            <template slot="user name " scope="item">
                {{item.username}}
            </template>
            <template slot="actions" scope="item">
                <b-btn size="sm" v-b-modal.editModal>edit</b-btn>
            </template>
        </b-table>
    
        <b-modal id="editModal" title="Edit the user">
            hi
    
        </b-modal>
    
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
            username: '',
            users: [],
            fields: {
                first_name: {
                    label: 'first name',
                },
                last_name: {
                    label: 'last name',
                },
                username: {
                    label: 'user name ',
                },
                actions: {
                    label: 'detail'
                }
            },
        }
    },
    async mounted() {
        await this.getUsers()
    },
    methods: {
        async getUsers() {
            this.users = (await this.$axios.get('users')).data
        },
        async newUser() {
            await this.$axios.post('new_user', {
                first_name: this.first_name,
                last_name: this.last_name,
                username: this.username
            })
            await this.getUsers()
        },
        editUser(item) {
            alert(JSON.stringify(item));
        }
    }
}
</script>