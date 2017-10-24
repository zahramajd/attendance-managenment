<template>
    <div>

        <div>
            <br>
            <b-card-group deck class="mb-3">
                <b-card bg-variant="primary" text-variant="white" header="کاربران" class="text-center">
                    <p class="card-text">مشاهده و ویرایش اطلاعات کاربران</p>
                </b-card>
                <b-card bg-variant="danger" text-variant="white" header="دروس" class="text-center">
                    <p class="card-text">مشاهده و ویرایش اطلاعات درس‌ها</p>
                </b-card>
            </b-card-group>
            <b-card-group deck class="mb-3">
                <b-card bg-variant="success" text-variant="white" header="دستگاه ها" class="text-center">
                    <p class="card-text">مشاهده و ویرایش اطلاعات دستگاه‌ها</p>
                </b-card>
                <b-card bg-variant="warning" text-variant="white" header="گزارش ها" class="text-center">
                    <p class="card-text">مشاهده گزارش ها</p>
                </b-card>
            </b-card-group>

        </div>

    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            text: '',
            device_name: '',
            first_name: '',
            last_name: '',
            username: ''
        }
    },
    methods: {
        async newDev() {
            await this.$axios.post('new_dev', {
                name: this.device_name
            })
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