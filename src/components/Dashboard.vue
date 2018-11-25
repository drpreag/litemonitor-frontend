/* eslint-disable */
<template>
  <div id="dashboard">
    
    <div class="row small-container">
      <div class="col-lg-4 text-center">
        <router-link :to="{ name:'Hosts' }">
          <div class="text-left">Hosts statistics:</div>
          <div>
            <donut-hosts-chart v-bind:passedHostChartData="passedHostChartData" :width="300" :height="200">
            </donut-hosts-chart>
          </div>
        </router-link>
      </div> 
      <div class="col-lg-4 text-center">
        <router-link :to="{ name:'Services' }">
          <div class="text-left">Services statistics:</div>
          <div>
            <donut-services-chart v-bind:passedServiceChartData="passedServiceChartData" :width="300" :height="200">
            </donut-services-chart>
          </div>
        </router-link>
      </div>    
      <div class="col-lg-4 text-center">
        Google Map
        <world-map v-bind:center="center" v-bind:hosts="hosts"></world-map>
      </div>
    </div>

    <div class="small-container" v-if="flappings">
      <table class="table table-striped table-condensed table-bordered">
        <thead>
          <th>Host</th>
          <th>Service</th>
          <th>Comment</th>
          <th class="text-center">Status change</th>
          <th>Changed at</th>
        </thead>
        <tbody>
          <tr v-for="flapping in flappings" :key="flapping.id">
            <td>{{ flapping.host_name }}</td>
            <td>{{ flapping.service_name }}</td>
            <td>{{ flapping.comment }}</td>            
            <td class="text-center">
              <drawing :sign="flapping.status" origin="updown" size="2"></drawing>
            </td>
            <td>{{ flapping.created_at | time-ago }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'
import DonutHostsChart from '@/components/Charts/DonutHostsChart'
import DonutServicesChart from '@/components/Charts/DonutServicesChart'
import WorldMap from '@/components/Charts/WorldMap'
// import Flapping from '@/components/Flappings/Flapping'

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
    this.getFlappings ();
    this.getHostsData ();
  },
  methods: {
    getFlappings () {
      this.$http  
        .get('/flappings')
        .then(response => {
          this.flappings = response.data.data;
        });
      this.$http
        .get('/hosts-stats')
        .then(response => {
          if (this.passedHostChartData[0]!=response.data.monitored || 
              this.passedHostChartData[1]!=response.data.non_monitored) {
            this.passedHostChartData=[response.data.monitored, response.data.non_monitored];
          }
        });       
      this.$http
        .get('/services-stats')
        .then(response => {
          if (this.passedServiceChartData[0]!=response.data.monitored || 
              this.passedServiceChartData[1]!=response.data.up || 
              this.passedServiceChartData[2]!=response.data.non_monitored) {
            this.passedServiceChartData=[response.data.down, response.data.up, response.data.non_monitored];
          }
        });
    },
    getHostsData () {
      this.$http
        .get('/hosts')
        .then(response => {
          var axios_hosts = response.data.data;
          for (var i = 0; i < axios_hosts.length; i++) {          
            if (axios_hosts[i].active!=0 && axios_hosts[i].ip!="" && axios_hosts[i].ip!=null && axios_hosts[i].ip!="127.0.0.1" && axios_hosts[i].ip!="localhost") {
              // valid IP address
              this.hosts.push ({ip: axios_hosts[i].ip, latitude: parseFloat(axios_hosts[i].latitude), longitude: parseFloat(axios_hosts[i].longitude), active: axios_hosts[i].active, name: axios_hosts[i].name});
            }
          }
        }); 
    }
  }
}
</script>

