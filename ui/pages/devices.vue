<template>
    <div>
        <div class="row">
            <div class="col-4" v-for="d in devices" :key=" d._id ">
                <b-card class="mycard m-1">{{d.name}}<br>
                    <b-btn size="sm" varient="primary" :to="'/device/' +d._id+ '/edit'">تغییر</b-btn>
                </b-card>

            </div>
        </div>

        <div class="col-lg-6">
            <br>
            <b-alert variant="secondary" dismissible :show="no_input_alert">نام دستگاه را وارد کنید</b-alert>
            <b-alert variant="secondary" dismissible :show="showWarn">این دستگاه وجود دارد</b-alert>

            <b-form-input v-model="device_name" type="text" placeholder="نام دستگاه"></b-form-input>
            <br>
            <b-btn @click="newDev">دستگاه جدید</b-btn>
        </div>

    </div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            devices: [],
            device_name: '',
            no_input_alert: false,
            showWarn: false
        }
    },
    async mounted() {
        await this.getDevices()
    },
    methods: {
        async getDevices() {
            this.devices = (await this.$axios.get('devices')).data
        },
        async newDev() {
            this.showWarn = false

            if (this.device_name == '')
                this.no_input_alert = true
            else {
                const res = await this.$axios.post('devices/new', {
                    name: this.device_name
                })
                await this.getDevices()
                console.log('res ', res.data.result)
                if (res.data.result == false)
                    this.showWarn = true
            }
        },
    }
}
</script>