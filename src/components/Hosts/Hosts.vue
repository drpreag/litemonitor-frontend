/* eslint-disable */
<template>
  <div id="hosts">
    
    <div class="row">
      <div class="col-lg-10">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-2 text-center">
        <router-link :to="{ name:'HostCreate' }">
          <button class="btn btn-sm btn-info">Add new Host</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="hosts">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>FQDN</th>
          <th class="text-center">Active</th>
          <th class="text-center"></th>
        </thead>
        <tbody> 
          <tr v-for="host in hosts" :key="host.id">
            <td>{{ host.name }}</td>
            <td>{{ host.description }}</td>
            <td>{{ host.fqdn }}</td>
            <td class="text-center">
              <drawing :sign="host.active" origin="yesno" size="2"></drawing>
            </td>
            <td class="text-center">
              <router-link :to="{ name: 'Host', params: { id: host.id }}">
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
import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'

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
