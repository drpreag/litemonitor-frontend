/* eslint-disable */
<template>
  <div id="services">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-1">
        <router-link :to="{ name:'ServiceCreate' }">
          <button class="btn btn-sm btn-primary">Add new Service</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="services">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
          <th>Name</th>
          <th>Host</th>
          <th>Probe</th>
          <th>Port</th>
          <th>Uri</th>
          <th>Active probe</th>
          <th>Status</th>
          <th></th>
        </thead>
        <tbody>          
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td>{{ service.host_name }}</td>
            <td>{{ service.probe_name }}</td>
            <td>{{ service.port }}</td>
            <td>{{ service.uri }}</td>
            <td align="center">
              <drawing :sign="service.active" origin="yesno" size="2"></drawing>
            </td>
            <td align="center">
              <div v-if="service.active">
                <drawing :sign="service.status" origin="updown" size="2"></drawing>&nbsp{{ service.status_change | time-ago }}
              </div>
            </td>
            <td align="center">
              <router-link :to="{ name: 'Service', params: { id: service.id }}">
                <button type="button" class="view_button">View</button>                
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'

export default {
  components: { Drawing },
  data () {
    return {
      services: [],
      errors: [],      
      title: 'Services',
      sign: null,
      baseURL: null  
    }
  },
  created () {
    this.timer = setInterval(this.getServices, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL
    this.getServices ()  
  },  
  methods: {
    getServices() {
      axios
        .get(this.baseURL+'/services', { crossdomain: true })
        .then(response => {
          this.services = response.data.data;
        });
    }
  }
}
</script>
