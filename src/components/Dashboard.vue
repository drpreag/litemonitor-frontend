/* eslint-disable */
<template>
  <div class="container" id="dashboard">
    
    <div class="center" v-if="hosts">
      <div class="row" v-for="i in Math.ceil(hosts.length / 6)" style="padding-bottom: 10px;">
        <div v-for="host in hosts.slice((i - 1) * 6, i * 6)">
          <div class="col">
            <div class="card">
              <router-link :to="{ name: 'Host', params: { id: host.id }}">
                <div class="card-header">
                  {{host.name}}
                </div>                
              </router-link>
              <div class="card-body">
                  <div v-for="service in services">
                    <div v-if="service.host_id==host.id && service.active==true">
                      <font size="-1">Service: </font><router-link :to="{ name: 'Service', params: { id: service.id }}">{{service.name}}</router-link><br>                          
                      <font size="-1">Probe: </font>{{ service.probe_name }}&nbsp{{ service.port }}
                      <drawing :sign="service.status" origin="updown" size="1"></drawing>
                      <div class="card-time" v-show="service.status_change">{{service.status_change}}</div>
                    </div>                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawing from '@/components/Charts/Drawing'

export default {
  components: { Drawing },
  data () {
    return {
      title: 'Dashboard',
      hosts: [],
      services: [],
      center: { lat: 47.527278, lng: -38.314444 },
      errors: []
    }
  },
  created () {
    this.getHostsData ();
    this.getServices ();
    this.timer = setInterval(this.getServices, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    getHostsData () {
      this.$http
        .get('/dashboard_hosts')
        .then(response => {
          this.hosts = response.data.data;
        })
        .catch(error => {
          this.errors = error;
        });          
    },
    getServices() {
      this.$http
        .get('/services')
        .then(response => {
          this.services = response.data.data;
        })
        .catch(error => {
          this.errors = error;
        });        
    }    
  }
}
</script>

