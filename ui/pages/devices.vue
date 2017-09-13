<template>
    <div>
        <div class="row">
            <div class="col-4" v-for="d in devices" :key=" d._id ">
                <b-card class="mycard m-1">{{d.name}}<br>
                    <b-btn size="sm" varient="primary" :to="'/device/' +d._id+ '/edit'">edit</b-btn>
                </b-card>

            </div>
        </div>

        <div class="col-lg-6">
            <br>
            <b-form-input v-model="device_name" type="text" placeholder="Enter the device name"></b-form-input>
            <br>
            <b-btn @click="newDev">New Device</b-btn>
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
            await this.$axios.post('devices/new', {
                name: this.device_name
            })
            await this.getDevices()
        },
    }
}
</script>