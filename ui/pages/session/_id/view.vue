<template>
    <div>
        <br>
        <h3>{{session.name}}</h3>
        <br>
        <br>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Times" active>
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
                            <template slot="actions" scope="h">
                                <b-btn size="sm" variant="success" v-if="isPresent(h.item)">present, click to remove</b-btn>
                                <b-btn size="sm" variant="danger" v-if="!isPresent(h.item)" @click="presentAttendee(h.item)">absent, click to add</b-btn>
                            </template>
                        </b-table>
                    </b-card>
                </b-tab>
                <b-tab title="Devices">
                    <b-card title="Devices">
                        <b-table striped hover :items="session.devices" :fields="fields_devices">
                            <template slot="device name" scope="item">
                                {{item.name}}
                            </template>
                        </b-table>
                    </b-card>
                </b-tab>
                <b-tab title="Logs">
                    <b-card title="Logs">
                        <b-table striped hover :sort-desc.sync="sortDesc" :items="logs" :fields="fields_logs">
                            <template slot="action type" scope="item">
                                {{item.type}}
                            </template>
                            <template slot="device id" scope="item">
                                {{item.device}}
                            </template>
                            <template slot="username" scope="item">
                                {{item.user}}
                            </template>
                            <template slot="time" scope="item">
                                {{new Date(item.timestamps).getDay()}}
                            </template>
                        </b-table>
                    </b-card>
                </b-tab>
                <b-tab title="Attended">
                    <b-card title="Attended">
                        <b-table striped hover :items="attended" :fields="fields_attendees">
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
                    </b-card>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            attendees: '',
            devices: '',
            daysOfWeek: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
            logs: [],
            sortDesc: false,
            session: {},
            logs: [],
            currentDate: new Date()
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
            actions: {
                label: 'presnt'
            }
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
        fields_logs: () => ({
            type: {
                label: 'action type',
            },
            device: {
                label: 'device id',
            },
            user: {
                label: 'Username',
                formatter: u => u.username
            },
            timestamps: {
                label: 'time',
                formatter: t => t.createdAt,
                sortable: true,
            }
        }),
        attended() {
            let attended = []
            this.logs.forEach(current_log => {
                this.session.attendees.forEach(current_user => {
                    if (current_log.user._id + '' === current_user._id + '') {
                        attended.push(current_user)
                    }
                })
            })
            return attended
        }

    },
    methods: {
        isPresent(user) {
            let _isPresent = false
            this.attended.forEach(function(currentUser) {
                console.log(user._id)
                if (currentUser._id + '' === user._id + '')
                    _isPresent = true
            })
            console.log(_isPresent)

            return _isPresent
        },
        async presentAttendee(user) {
            let res = await this.$axios.$post('logs/new', {
                session: this.$route.params.id,
                user: user._id,
            })
            this.load()
        },
        async removeAttendee(user) {
            let res = await this.$axios.$post('logs/remove', {
                session: this.$route.params.id,
                user: user._id,
            })
            this.load()
        },
        async load() {
            this.session = await this.$axios.$get('sessions/' + this.$route.params.id + '/detail')
            this.logs = await this.$axios.$get('logs/' + this.$route.params.id + '/' + this.currentDate.toISOString())
        }
    },

    async mounted() {
        await this.load()
    },

}
</script>
