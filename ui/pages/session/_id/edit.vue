<template>
    <div>
        <br>
        <h3>{{session.name}}</h3>
        <br>
        <br>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Times">
                    <b-card title="Times">
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
                    </b-card>
                </b-tab>

                <b-tab title="Attendees">
                    <b-card title="Attendees">
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
                    </b-card>
                </b-tab>
                <b-tab title="Devices">
                    <b-card title="Devices">
                        <b-table striped hover :items="session.devices" :fields="fields_devices">
                            <template slot="device name" scope="item">
                                {{item.name}}
                            </template>
                        </b-table>
                        <b-button v-b-modal.modal-devices>
                            add new device
                        </b-button>
                        <b-modal id="modal-devices" title="add new device" @ok="submit_device">

                            <form @submit.stop.prevent="submit">
                                <b-form-select v-model="add_device" :options="options_devices"></b-form-select>
                            </form>

                        </b-modal>
                    </b-card>
                    <!-- <b-table striped hover :items="" :fields="">
                                                                                                                                                                                                                                                <template slot="first name" scope="item">
                                                                                                                                                                                                                                                    {{item.first_name}}
                                                                                                                                                                                                                                                </template>
                                                                                                                                                                                                                                                <template slot="last name" scope="item">
                                                                                                                                                                                                                                                    {{item.last_name}}
                                                                                                                                                                                                                                                </template>
                                                                                                                                                                                                                                                <template slot="user name" scope="item">
                                                                                                                                                                                                                                                    {{item.username}}
                                                                                                                                                                                                                                                </template>
                                                                                                                                                                                                                                            </b-table> -->

                </b-tab>
                <b-tab title="Date">
                    <b-card title="Date">
                        <b-form @submit="submit_date" inline>
                            <b-form-group label="Start Date">
                                <b-form-input type="number" v-model="start_date_day" required placeholder="Day"></b-form-input>
                                <b-form-input type="number" v-model="start_date_month" required placeholder="Month"></b-form-input>
                                <b-form-input type="number" v-model="start_date_yaer" required placeholder="Year"></b-form-input>
                            </b-form-group>

                            <b-form-group label="End Date">
                                <b-form-input type="number" v-model="end_date_day" required placeholder="Day"></b-form-input>
                                <b-form-input type="number" v-model="end_date_month" required placeholder="Month"></b-form-input>
                                <b-form-input type="number" v-model="end_date_yaer" required placeholder="Year"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                    </b-card>
                </b-tab>
            </b-tabs>
        </b-card>
        <br><br>
        <b-button v-b-modal.modal-manager>
            add new manager
        </b-button>
        <b-modal id="modal-manager" title="add new manager" @ok="submit_manager">

            <form @submit.stop.prevent="submit">
                <b-form-select v-model="add_manager" :options="options_users"></b-form-select>
            </form>

        </b-modal>
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
            add_attendee: '',
            add_device: '',
            add_manager: '',
            start_date_day: '',
            end_date_day: '',
            start_date_month: '',
            end_date_month: '',
            start_date_year: '',
            end_date_year: ''
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
        options_users: function() {

            let options_users = []
            for (var el of this.all_users) {
                options_users.push({ text: el.username, value: el._id })
            }
            return options_users
        },
        options_devices: function() {

            let options_devices = []
            for (var el of this.all_devices) {
                options_devices.push({ text: el.name, value: el._id })
            }
            return options_devices
        }

    },
    async asyncData({ app, route }) {
        let session = (await app.$axios.get('sessions/' + route.params.id + '/detail')).data
        let all_users = (await app.$axios.get('users')).data
        let all_devices = (await app.$axios.get('devices')).data

        return {
            session,
            all_users,
            all_devices
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
            this.session.attendees.push(this.add_attendee)
            await this.$axios.post('/sessions/' + this.$route.params.id + '/edit', this.session)

        },
        async submit_device() {
            this.session.devices.push(this.add_device)
            await this.$axios.post('/sessions/' + this.$route.params.id + '/edit', this.session)
        },
        async submit_manager() {
            await console.log("manager")
            await this.$axios.post('/users/' + this.add_manager + '/edit', this.session)

        },
        async submit_date() {
            console.log('in submit date', this.date_day)
            let start_date = new Date(this.start_date_year, this.start_date_month, this.start_date_day + 1)
            let end_date = new Date(this.end_date_year, this.end_date_month, this.end_date_day + 1)
            const res = await this.$axios.post('/sessions/' + this.$route.params.id + '/edit', {
                start_date: start_date,
                end_date: end_date
            })

        },
    }
}
</script>
