/* eslint-disable */
<template>
  <div id="services">

    <div class="row">
      <div class="col-lg-10">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-2 text-center">
        <router-link :to="{ name:'ServiceCreate' }">
          <button class="btn btn-sm btn-info">Add new Service</button>
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
          <th class="text-center">Active probe</th>
          <th class="text-center">Status</th>
          <th></th>
        </thead>
        <tbody>          
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td>{{ service.host_name }}</td>
            <td>{{ service.probe_name }}</td>
            <td>{{ service.port }}</td>
            <td>{{ service.uri }}</td>
            <td class="text-center">
              <drawing :sign="service.active" origin="yesno" size="2"></drawing>
            </td>
            <td class="text-center">
              <div v-if="service.active">
                <drawing :sign="service.status" origin="updown" size="2"></drawing>&nbsp{{ service.status_change | time-ago }}
              </div>
            </td>
            <td class="text-center">
              <router-link :to="{ name: 'Service', params: { id: service.id }}">
                <button class="btn btn-xs btn-info">View</button>                
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Drawing from '@/components/Charts/Drawing'

export default {
  components: { Drawing },
  data () {
    return {
      services: [],
      errors: [],      
      title: 'Services',
      sign: null,
    }
  },
  created () {
    this.timer = setInterval(this.getServices, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.getServices ()  
  },  
  methods: {
    getServices() {
      this.$http
        .get('/services')
        .then(response => {
          this.services = response.data.data;
        });
    }
  }
}
</script>
