<template>
    <div>
        <!-- Pets: {{ pets.map(p => p.name) }} -->
    
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
    data() {
        return {
            device_name: '',
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

    }
}
</script>