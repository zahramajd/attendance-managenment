import Vue from 'vue'
import { mixins, Bar, Pie } from 'vue-chartjs'

// https://github.com/apertureless/vue-chartjs

// <bar-chart>
Vue.component('bar-chart', Bar.extend({
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}))

// <pie-chart>
Vue.component('pie-chart', Pie.extend({
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}))
