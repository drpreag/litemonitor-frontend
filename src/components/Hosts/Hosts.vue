/* eslint-disable */
<template>
  <div id="hosts" class="content">
    
    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'HostCreate' }">
          <button class="button is-primary is-small is-rounded">Add new Host</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="hosts">
      <table class="table is-bordered is-striped is-fullwidth is-hoverable">
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>FQDN</th>
          <th class="has-text-centered">ICMP probes</th>
          <th class="has-text-centered">ICMP status</th>
          <th></th>
        </thead>
        <tbody> 
          <tr v-for="host in hosts" :key="host.id">
            <td>{{ host.name }}</td>
            <td>{{ host.description }}</td>
            <td>{{ host.fqdn }}</td>
            <td class="has-text-centered">
              <drawing :sign="host.icmp_probe" origin="yesno"></drawing>
            </td>
            <td class="has-text-centered">
              <selection v-if="host.icmp_probe">
                <drawing :sign="host.icmp_status" origin="updown"></drawing>&nbsp{{ host.status_change | time-ago }}
              </selection>
            </td>
            <td>
              <router-link :to="{ name: 'Host', params: { id: host.id }}">
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
      hosts: [],
      errors: [],      
      title: 'Hosts',
      sign: null,
      origin,
      baseURL: null      
    }
  },
  created () {
    this.timer = setInterval(this.getHosts, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },  
  mounted () {
    this.baseURL = process.env.API_BASE_URL
    this.getHosts ()
  },  
  methods: {
    getHosts () {
      axios  
        //.get(this.baseURL+'/hosts?page=${page}&per_page=${itemsPerPage}', { crossdomain: true })
        .get(this.baseURL+'/hosts', { crossdomain: true })
        .then(response => {
          this.hosts = response.data.data;
          //this.total = response.data.meta.total
          //this.page = this.current = response.data.meta.current_page
          //this.itemsPerPage = response.data.meta.per_page          
        });
    }    
  }
}
</script>
