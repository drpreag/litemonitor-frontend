/* eslint-disable */
<template>
  <div id="dashboard" class="content">
    
    <div class="columns">
      <div class="column is-half">
        Hosts statistics:
        <donut-hosts-chart v-bind:passedHostChartData="passedHostChartData" :width="300" :height="200"></donut-hosts-chart>
      </div> 
      <div class="column is-half">
        Services statistics:
        <donut-services-chart v-bind:passedServiceChartData="passedServiceChartData" :width="300" :height="200"></donut-services-chart>
      </div>    
    </div>

    <div v-if="flappings">
      <table class="table is-bordered is-striped is-hoverable is-narrow">
        <thead>
          <th>Host</th>
          <th>Service</th>
          <th>Comment</th>
          <th class="has-text-centered">Status change</th>
          <th>Changed at</th>
        </thead>
        <tbody>
          <tr v-for="flapping in flappings" :key="flapping.id">
            <td>{{ flapping.host_name }}</td>
            <td>{{ flapping.service_name }}</td>
            <td>{{ flapping.comment }}</td>            
            <td class="has-text-centered">
              <drawing :sign="flapping.status" origin="updown"></drawing>
            </td>
            <td>{{ flapping.created_at | timeago }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'
import DonutHostsChart from '@/components/Charts/DonutHostsChart'
import DonutServicesChart from '@/components/Charts/DonutServicesChart'

export default {
  components: { Drawing, DonutHostsChart, DonutServicesChart },
  data () {
    return {
      title: 'Dashboard',
      flappings: [],
      passedHostChartData: [],
      passedServiceChartData: [],
      baseURL: null
    }
  },
  created () {
    this.timer = setInterval(this.getFlappings, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL  
    this.getFlappings ()
  },
  methods: {
    getFlappings () {
      axios  
        .get(this.baseURL+'/flappings', { crossdomain: true })
        .then(response => {
          this.flappings = response.data.data;
        });
      axios
        .get(this.baseURL+'/host-stats', { crossdomain: true })
        .then(response => {
          if (this.passedHostChartData[0]!=response.data.down || 
              this.passedHostChartData[1]!=response.data.up || 
              this.passedHostChartData[2]!=response.data.non_monitored) {
            this.passedHostChartData=[response.data.down, response.data.up, response.data.non_monitored];
          }
        });       
      axios
        .get(this.baseURL+'/service-stats', { crossdomain: true })
        .then(response => {
          if (this.passedServiceChartData[0]!=response.data.down || 
              this.passedServiceChartData[1]!=response.data.up || 
              this.passedServiceChartData[2]!=response.data.non_monitored) {
            this.passedServiceChartData=[response.data.down, response.data.up, response.data.non_monitored];
          }
        });
    }
  }
}
</script>

