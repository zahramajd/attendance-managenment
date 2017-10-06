<template>
    <div>
        <br>
        <h3>{{session.name}}</h3>
        <br>
        <br>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="حاضران">
                    <b-card :sub-title="selected_day_jalali">
                        <div class="row">
                            <div class="col-4">
                                <b-form-select v-model="selected_day" :options="date_options" class="mb-3" :select-size="Math.min(date_options.length, 20)" @input="load" />
                            </div>
                            <div class="col-8">
                                <div v-if="loading">Loading... </div>
                                <b-table v-else striped hover :items="session.attendees" :fields="fields_attendees">
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
                                        <b-btn size="sm" variant="success" v-if="isPresent(h.item)" @click="removeAttendee(h.item)">حاضر، اعلام غیبت</b-btn>
                                        <b-btn size="sm" variant="danger" v-if="!isPresent(h.item)" @click="presentAttendee(h.item)">غایب، اعلام حضور</b-btn>
                                    </template>
                                </b-table>
                                <pie-chart :chart-data="chartPerSession" :width="400" :height="200" />
                            </div>
                        </div>
                    </b-card>
                </b-tab>
                <b-tab title="زمان ها">
                    <b-card>
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

                <b-tab title="دستگاه ها" v-if="$store.getters.accessDevices">
                    <b-card>
                        <b-table striped hover :items="session.devices" :fields="fields_devices">
                            <template slot="device name" scope="item">
                                {{item.name}}
                            </template>
                        </b-table>
                    </b-card>
                </b-tab>
                <b-tab title="سوابق">
                    <b-card>
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
                <b-tab title="نمودارها">
                    <b-card>
                        <bar-chart :chart-data="chartPerTerm" :width="400" :height="200" />
                    </b-card>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import moment from 'moment-jalaali'

moment.loadPersian()

const jalaali = date => moment(date).format('jYYYY/jM/jD')

export default {
    middleware: 'auth',
    data() {
        return {
            attendees: '',
            devices: '',
            logs: [],
            sortDesc: false,
            session: {},
            logs: [],
            currentDate: new Date(),
            days: [],
            selected_day: null,
            loading: false,
            chart_per_term: [],
            chart_per_session: []
        }
    },
    computed: {
        daysOfWeek: () => ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],

        chartPerTerm() {
            return ({
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
                datasets: [
                    {
                        label: 'term history',
                        backgroundColor: '#f87979',
                        data: this.chart_per_term.num_of_present_in_day
                    }
                ]
            })
        },
        chartPerSession() {
            return ({
                labels: ['present', 'absent'],
                datasets: [
                    {
                        label: 'session history',
                        backgroundColor: ['#ff6384', '#36a2eb'],
                        data: [this.chart_per_session.present, (this.chart_per_session.total - this.chart_per_session.present)]
                    }
                ]
            })
        },
        selected_day_jalali() {
            return this.selected_day ? jalaali(this.selected_day) : '?'
        },
        date_options() {
            return this.days.map(date => ({
                text: jalaali(date),
                value: date
            }))
        },
        fields_attendees: () => ({
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
                label: 'حاضر بودن'
            }
        }),
        fields_devices: () => ({
            name: {
                label: 'نام دستگاه'
            }
        }),
        fields_times() {
            return {
                day: {
                    label: 'روز',
                    formatter: (value, key, item) => value // this.daysOfWeek[value]
                },
                time: {
                    label: 'زمان برگزاری',
                    formatter: (value, key, item) => item.from + '-' + item.to
                }
            }
        },
        fields_logs: () => ({
            type: {
                label: 'نوع',
            },
            device: {
                label: 'دستگاه',
            },
            user: {
                label: 'نام کاربری',
                formatter: u => u.username
            },
            timestamps: {
                label: 'زمان',
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
                if (currentUser._id + '' === user._id + '')
                    _isPresent = true
            })
            return _isPresent
        },
        async presentAttendee(user) {
            let res = await this.$axios.$post('logs/add', {
                session: this.$route.params.id,
                user: user._id,
                createdAt: this.selected_day
            })
            this.load()
        },
        async removeAttendee(user) {

            let logID = this.findLogID(user, this.$route.params.id)
            let res = await this.$axios.$post('logs/remove', {
                session: this.$route.params.id,
                user: user._id,
                id: logID
            })
            this.load()
        },
        async load() {
            this.loading = true

            this.session = await this.$axios.$get('sessions/' + this.$route.params.id + '/detail')

            this.days = await this.$axios.$get('sessions/' + this.$route.params.id + '/days')
            if (!this.selected_day) {
                this.selected_day = this.days[0]
            }

            this.logs = await this.$axios.$get('logs/' + this.$route.params.id + '/date/' + this.selected_day)
            this.chart_per_session = await this.$axios.$get('logs/' + this.$route.params.id + '/' + this.selected_day + '/chart_per_session')
            this.chart_per_term = await this.$axios.$get('logs/' + this.$route.params.id + '/chart_per_term')

            this.loading = false
        },
        findLogID(user, sessionID) {
            return this.logs.find(current_log => {
                if ((current_log.user._id + '' === user._id + '') && (current_log.session + '' === sessionID + '')) {
                    return true
                }
            })
        }
    },

    async mounted() {
        await this.load()
    },

}

</script>
