/* eslint-disable */
<template>
  <div id="service-widget" class="text-left">
    <div v-for="service in services">
      <div>
        <font size="-1">Service: </font>
        <router-link :to="{ name: 'Service', params: { id: service.id }}">{{service.name}}</router-link>
      </div>
      <div>
      <font size="-1">Probe: </font>
      {{ service.probe_name }}&nbsp{{ service.port }} 
      <drawing :sign="service.status" origin="updown" size="1"></drawing>
      </div>
      <div v-show="service.status_change">
        <font size="-1">Last flap:{{service.status_change}}</font>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import Drawing from '@/components/common/Drawing'

export default {
  name: 'Servicewidget',
  props: { hostid: { Number, default: 0 } },
  data () {
    return {
      services: [],
      errors: []
    }
  },
  created () {
    this.getServices ();
    this.timer = setInterval(this.getServices, 20000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    getServices() {
      if (this.hostid > 0) {
        this.$http
          .get('/hosts/'+this.hostid+'/services')
          .then(response => {
            this.services = response.data.data;
          })
          .catch(error => {
            this.errors = error;
          });        
      }
    }        
  },
  components: { Drawing },
}
</script>

