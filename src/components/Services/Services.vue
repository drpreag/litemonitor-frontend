/* eslint-disable */
<template>
  <div id="services" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'ServiceCreate' }">
          <button class="button is-primary is-small is-rounded">Add new Service</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="services">
      <table class="table is-bordered is-striped is-fullwidth is-hoverable">
        <thead>
          <th>Name</th>
          <th>Host</th>
          <th>Probe</th>
          <th>Port</th>
          <th>Uri</th>
          <th class="has-text-centered">Active probe</th>
          <th class="has-text-centered">Status</th>
          <th></th>
        </thead>
        <tbody>          
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td>{{ service.host_name }}</td>
            <td>{{ service.probe_name }}</td>
            <td>{{ service.port }}</td>
            <td>{{ service.uri }}</td>
            <td class="has-text-centered">
              <drawing :sign="service.active" origin="yesno"></drawing>
            </td>
            <td class="has-text-centered">
              <drawing :sign="service.status" origin="updown"></drawing> 
            </td>
            <td>
              <router-link :to="{ name: 'Service', params: { id: service.id }}">
                <button type="button" class="button is-light is-small is-rounded">View</button>
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
import Drawing from '@/components/Drawing'

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
