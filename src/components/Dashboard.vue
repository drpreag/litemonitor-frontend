/* eslint-disable */
<template>
  <div id="dashboard" class="content">
    
    <div class="columns">
      <div class="column is-quarter" align="left">
        <router-link :to="{ name:'Hosts' }">
          <div>
            Hosts statistics:
            <donut-hosts-chart v-bind:passedHostChartData="passedHostChartData" :width="300" :height="200">
            </donut-hosts-chart>
          </div>
        </router-link>
      </div> 
      <div class="column is-quarter" align="left">
        <router-link :to="{ name:'Services' }">
          <div>
            Services statistics:
            <donut-services-chart v-bind:passedServiceChartData="passedServiceChartData" :width="300" :height="200">
            </donut-services-chart>
          </div>
        </router-link>
      </div>    
      <div class="column is-half" align="right">
        Google Map
        <world-map v-bind:center="center" v-bind:hosts="hosts"></world-map>
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
            <td>{{ flapping.created_at | time-ago }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'
import DonutHostsChart from '@/components/Charts/DonutHostsChart'
import DonutServicesChart from '@/components/Charts/DonutServicesChart'
import WorldMap from '@/components/Charts/WorldMap'

export default {
  components: { Drawing, DonutHostsChart, DonutServicesChart, WorldMap },
  data () {
    return {
      title: 'Dashboard',
      flappings: [],
      passedHostChartData: [],
      passedServiceChartData: [],
      baseURL: null,
      hosts: [],
      center: { lat: 47.527278, lng: -38.314444 },
    }
  },
  created () {
    this.timer = setInterval(this.getFlappings, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL;
    this.getFlappings ();
    this.getHostData ();
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
          if (this.passedHostChartData[0]!=response.data.monitored || 
              this.passedHostChartData[1]!=response.data.non_monitored) {
            this.passedHostChartData=[response.data.monitored, response.data.non_monitored];
          }
        });       
      axios
        .get(this.baseURL+'/service-stats', { crossdomain: true })
        .then(response => {
          if (this.passedServiceChartData[0]!=response.data.monitored || 
              this.passedServiceChartData[1]!=response.data.up || 
              this.passedServiceChartData[2]!=response.data.non_monitored) {
            this.passedServiceChartData=[response.data.down, response.data.up, response.data.non_monitored];
          }
        });
    },
    getHostData () {
      axios
        .get(this.baseURL+'/hosts', { crossdomain: true })
        .then(response => {
          var axios_hosts = response.data.data;
          for (var i = 0; i < axios_hosts.length; i++) {
            if (axios_hosts[i].ip != null) {
              // valid IP address
//            this.hosts.push ( {ip: axios_hosts[i].ip, status: axios_hosts[i].icmp_status, name: axios_hosts[i].name} );
            this.hosts.push ( {ip: axios_hosts[i].ip, status: axios_hosts[i].icmp_status, name: axios_hosts[i].name} );
//            var c = ((a < b) ? 'minor' : 'major');
            }
          }
        }); 
    }
  }
}
</script>

