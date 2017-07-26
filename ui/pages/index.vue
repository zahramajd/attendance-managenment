<template>
    <div>
        Pets: {{ pets.map(p => p.name) }}
        <br>
        <b-btn @click="newPet">New Pet</b-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pets: []
        }
    },
    mounted() {
        this.getPets()
    },
    methods: {
        async getPets() {
            this.pets = (await this.$axios.get('pets')).data
        },
        async newPet() {
            await this.$axios.post('new_pet', {
                name: Math.random() * 1000
            })
            await this.getPets()
        },

    }

}

</script>