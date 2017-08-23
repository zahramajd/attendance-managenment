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

        <br>
        <br>
        <b-table striped hover :items="session.devices" :fields="fields_devices">
            <template slot="device name" scope="item">
                {{item.name}}
            </template>
        </b-table>
        <br>
        <br>
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

    },
    async asyncData({ app, route }) {

        let currentDate = new Date()

        let session = await app.$axios.$get('sessions/' + route.params.id + '/detail')
        let all_users = await app.$axios.$get('users')
        let all_devices = await app.$axios.$get('devices')
        let logs = await app.$axios.$get('logs/' + route.params.id + '/' + currentDate.toISOString())

        return {
            session,
            all_users,
            all_devices,
            logs,
            currentDate
        }
    },
}
</script>
