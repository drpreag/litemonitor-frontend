/* eslint-disable */
<template>
  <div class="container" id="dashboard">
    
    <div class="center" v-if="hosts">
      <div class="row" v-for="i in Math.ceil(hosts.length / 4)" style="padding-bottom: 20px;">
        <div v-for="host in hosts.slice((i - 1) * 4, i * 4)">
          <div class="col">
            <div class="card">
              <router-link :to="{ name: 'Host', params: { id: host.id }}">
                <div class="card-header">
                  {{host.name}}
                </div>                                  
              </router-link>

              <div class="card-body">
                <servicewidget :hostid="host.id"></servicewidget>
              </div>
                
              <!-- div class="card-body">
                  <div v-for="service in services">
                    <div v-if="service.host_id==host.id && service.active==true">
                      <servicewidget :serviceid="service.id"></servicewidget>
                      index: {{ services.index }} length:{{ services.length }}
                      <div v-if="services.index!=services.length">
                        <hr>
                      </div>
                    </div>
                  </div>
              </div -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Servicewidget from '@/components/common/Servicewidget';

export default {
  components: { Servicewidget },
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

