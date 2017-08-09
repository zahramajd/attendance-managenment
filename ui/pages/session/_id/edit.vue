<template>
    <div>
        <br>
        <h3>{{session.name}}</h3>
        <br>
        <br>
        <b-table striped hover :items="session.times" :fields="fields_times">
            <template slot="day" scope="row">
                {{getDayOfWeek(row.value)}}
            </template>
            <template slot="from" scope="item">
                {{item.value}}
            </template>
            <template slot="to" scope="item">
                {{item.value}}
            </template>
        </b-table>
        <br>
        <b-table striped hover :items="session.attendees" :fields="fields_attendees">
            <template slot="first name" scope="item">
                {{item.first_name}}
            </template>
            <template slot="last name" scope="item">
                {{item.last_name}}
            </template>
            <template slot="user name" scope="item">
                {{item.username}}
            </template>
        </b-table>
        <br>
        <br>
        <b-table striped hover :items="session.devices" :fields="fields_devices">
            <template slot="device name" scope="item">
                {{item.name}}
            </template>
    
        </b-table>
    
        <br>
        <b-button href="">
            update
        </b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            session: '',
            attendees: '',
            devices: ''
        }
    },
    computed: {
        fields_attendees: () => ({
            first_name: {
                label: 'first name',
            },
            last_name: {
                label: 'last name',
            },
            username: {
                label: 'user name ',
            },
        }),
        fields_devices: () => ({
            name: {
                label: 'device name'
            }
        }),
        fields_times: () => ({
            day: {
                label: 'day'
            },
            from: {
                label: 'from'
            },
            to: {
                label: 'to'
            }
        })
    },
    async mounted() {
        await this.getSessionDetail()
    },
    methods: {

        async getSessionDetail() {
            this.session = (await this.$axios.get('sessions/' + this.$route.params.id + '/detail')).data
        },

        getDayOfWeek(num_day) {
            if (num_day == 0)
                return 'یکشنبه'
            if (num_day == 1)
                return 'دوشنبه'
            if (num_day == 2)
                return 'سه شنبه'
            if (num_day == 3)
                return 'چهارشنبه'
            if (num_day == 4)
                return 'پنجشنبه'
            if (num_day == 5)
                return 'جمعه'
            if (num_day == 6)
                return 'شنبه'

            return num_day
        }
    }
}
</script>