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
                <b-btn size="sm" @click="modalClicked(item.item)">تغییر</b-btn>
            </template>
        </b-table>

        <b-modal v-model="modalShow" title="Edit the user" @ok="handleOk">

            <template v-if="lastClickedItem">
                <b-form-input v-model="lastClickedItem.first_name" type="text"></b-form-input>
                <br>

                <br>
                <b-form-input v-model="lastClickedItem.last_name" type="text"></b-form-input>
                <br>

                <br>
                <b-form-input v-model="lastClickedItem.username" type="text"></b-form-input>
                <br>

                <br>
                <b-form-input v-model="lastClickedItem.password" type="password"></b-form-input>
            </template>
        </b-modal>

        <div class="col-lg-6">
            <br>
            <b-form-input v-model="first_name" type="text" placeholder="نام"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="last_name" type="text" placeholder="نام خانوادگی"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="username" type="text" placeholder="نام کاربری"></b-form-input>
            <br>

            <br>
            <b-form-input v-model="password" type="password" placeholder="رمز عبور"></b-form-input>
            <br>

            <b-btn @click="newUser">ایجاد کاربر</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            users: [],
            fields: {
                first_name: {
                    label: 'نام',
                },
                last_name: {
                    label: 'نام خانوادگی',
                },
                username: {
                    label: 'نام کاربری',
                },
                actions: {
                    label: 'عملیات'
                }
            },
            modalShow: false,
            lastClickedItem: null,
            edit_first_name: '',
            edit_last_name: '',
            edit_username: '',
            edit_password: '',
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
            await this.$axios.post('users/new', {
                first_name: this.first_name,
                last_name: this.last_name,
                username: this.username,
                password: this.password
            })
            await this.getUsers()
        },
        editUser(item) {
            alert(JSON.stringify(item));
        },
        modalClicked(item) {
            this.modalShow = true
            this.lastClickedItem = Object.assign({}, item)
        },
        async handleOk() {
            await this.$axios.post('users/' + this.lastClickedItem._id + '/edit', {
                first_name: this.lastClickedItem.first_name,
                last_name: this.lastClickedItem.last_name,
                username: this.lastClickedItem.username,
                password: this.lastClickedItem.password
            })
            await this.getUsers()

        }
    }
}
</script>