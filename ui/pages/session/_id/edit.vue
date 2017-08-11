<template>
    <div>
        <br>
        <h3>{{session.name}}</h3>
        <br>
        <br>
        <b-table striped hover :items="session.times" :fields="fields_times">
            <template slot="day" scope="row">
                {{daysOfWeek[row.value]}}
            </template>
            <template slot="from" scope="item">
                {{item.value}}
            </template>
            <template slot="to" scope="item">
                {{item.value}}
            </template>
        </b-table>
        <b-button v-b-modal.modal-time>
            add new time
        </b-button>
    
        <b-modal id="modal-time" title="add new time" @ok="submit_time">
    
            <form @submit.stop.prevent="submit">
                <b-form-select placeholder="day" v-model="add_day" :options="options_week"></b-form-select>
                <br>
                <br>
                <b-form-input type="number" placeholder="from" v-model="add_from"></b-form-input>
                <br>
                <b-form-input type="number" placeholder="to" v-model="add_to"></b-form-input>
            </form>
    
        </b-modal>
        <br>
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
        <b-button v-b-modal.modal-attendees>
            add new attendee
        </b-button>
        <b-modal id="modal-attendees" title="add new attendee" @ok="submit_attendee">
    
            <form @submit.stop.prevent="submit">
                <b-form-select v-model="add_attendee" :options="options_users"></b-form-select>
            </form>
    
        </b-modal>
        <br>
        <br>
        <b-table striped hover :items="session.devices" :fields="fields_devices">
            <template slot="device name" scope="item">
                {{item.name}}
            </template>
        </b-table>
        <b-button href="">
            add new device
        </b-button>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            attendees: '',
            devices: '',
            daysOfWeek: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
            add_day: 6,
            options_week: [
                {
                    text: 'شنبه',
                    value: '6'
                },
                {
                    text: 'یکشنبه',
                    value: '0'
                },
                {
                    text: 'دوشنبه',
                    value: '1'
                },
                {
                    text: 'سه شنبه',
                    value: '2'
                },
                {
                    text: 'چهارشنبه',
                    value: '3'
                },
                {
                    text: 'پنجشنبه',
                    value: '4'
                },
                {
                    text: 'جمعه',
                    value: '5'
                },
            ],
            add_from: '',
            add_to: '',
            // options_users: [],
            add_attendee: ''
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
        }),
        options_users: function () {

            let options_users = []
            for (var el of this.all_users) {
                options_users.push({ text: el.username, value: el.username })
            }
            return options_users
        }

    },
    async asyncData({ app, route }) {
        let session = (await app.$axios.get('sessions/' + route.params.id + '/detail')).data
        let all_users = (await app.$axios.get('users')).data

        return {
            session,
            all_users
        }
    },
    methods: {
        async submit_time() {
            this.session.times.push({
                day: this.add_day,
                from: this.add_from,
                to: this.add_to
            })
            await this.$axios.post('/sessions/' + this.$route.params.id + '/edit', this.session)
        },
        async submit_attendee() {

        }
    }
}
</script>
