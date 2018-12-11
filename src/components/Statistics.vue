/* eslint-disable */
<template>
  <div class="container" id="statistics">

      <div class="row" style="padding-bottom:30px;">

        <div class="col-md-4 offset-md-2">
          <div align="center">
            <router-link :to="{ name:'Hosts' }">
              <p>Hosts statistics:</p>
                <donut-hosts-chart v-bind:passedHostChartData="passedHostChartData" :width="300" :height="200">
                </donut-hosts-chart>
            </router-link>
          </div>
        </div> 
        <div class="col-md-4">
          <div align="center">
            <router-link :to="{ name:'Services' }">
              <p>Service statistics:</p>
                <donut-services-chart v-bind:passedServiceChartData="passedServiceChartData" :width="300" :height="200">
                </donut-services-chart>
            </router-link>
          </div>
        </div>    

      </div>

    <div class="container" style="padding-bottom:30px;">
      <div id="gmap_div" ref="gmap_div" align="center" text-align="center">
        <world-map v-bind:center="center" v-bind:hosts="hosts" ></world-map>
      </div>
    </div> 

</div>
</template>

<script>
// import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'
import DonutHostsChart from '@/components/Charts/DonutHostsChart'
import DonutServicesChart from '@/components/Charts/DonutServicesChart'
import WorldMap from '@/components/Charts/WorldMap'

export default {
  components: { Drawing, DonutHostsChart, DonutServicesChart, WorldMap },
  data () {
    return {
      title: 'Dashboard',
      passedHostChartData: [],
      passedServiceChartData: [],
      hosts: [],
      center: { lat: 47.527278, lng: -38.314444 },
      errors: [],
      gwidth:300,
      gheight:200
    }
  },
  created () {
    this.getHostsData ();    
    this.timer = setInterval(this.getHostData, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    getHostsData () {
      this.$http
        .get('/hosts-stats')
        .then(response => {
          if (this.passedHostChartData[0]!=response.data.monitored || 
              this.passedHostChartData[1]!=response.data.non_monitored) {
            this.passedHostChartData=[response.data.monitored, response.data.non_monitored];
          }
        })
        .catch(error => {
          this.errors = error;
        });

      this.$http
        .get('/services-stats')
        .then(response => {
          if (this.passedServiceChartData[0]!=response.data.monitored || 
              this.passedServiceChartData[1]!=response.data.up || 
              this.passedServiceChartData[2]!=response.data.non_monitored) {
            this.passedServiceChartData=[response.data.down, response.data.up, response.data.non_monitored];
          }
        })
        .catch(error => {
          this.errors = error;
        });          

      this.$http
        .get('/ip_addresses')
        .then(response => {
          var axios_hosts = response.data.data;
          for (var i = 0; i < axios_hosts.length; i++) {          
            if (axios_hosts[i].active!=0 && axios_hosts[i].ip!="" && axios_hosts[i].ip!=null && axios_hosts[i].ip!="127.0.0.1" && axios_hosts[i].ip!="localhost") {
              // valid IP address
              this.hosts.push ({ip: axios_hosts[i].ip, latitude: parseFloat(axios_hosts[i].latitude), longitude: parseFloat(axios_hosts[i].longitude), active: axios_hosts[i].active, name: axios_hosts[i].name});
            }
          }
        })
        .catch(error => {
          this.errors = error;
        });       
    }
  }
}
</script>

