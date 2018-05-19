/* eslint-disable */
<template>
  <div id="host" class="content">

    <div v-if="host" class="box">

      <div class="columns">
        <div class="column is-three-quarters">
          <h3>{{ title }}</h3>      
        </div>
        <div class="column is-one-quarters add-new-resource">
          <router-link :to="{ name:'Hosts' }">
            <button class="button is-primary is-small is-rounded">Back</button>
          </router-link>
          &nbsp
          <router-link :to="{ name:'HostEdit', params: { id: host.id }}">
            <button class="button is-warning is-small is-rounded">Edit</button>
          </router-link>          
          &nbsp
          <button class="button is-danger is-small is-rounded" v-on:click="deleteHost(host.id)">
            Delete
          </button>
        </div>
      </div>  

      <div class="columns">
        <div class="column field is-half">

          <div class="control">          
            <label class="label">Name</label>
            <input class="input" type="text" readonly="readonly" v-model=host.name>
          </div>

          <div class="control">          
            <label class="label">Description</label>
            <input class="input" type="text" readonly="readonly" v-model=host.description>
          </div>

          <div class="control">          
            <label class="label">FQDN</label>
            <input class="input" type="text" readonly="readonly" v-model=host.fqdn>
            IP address: {{ host.ip }}
          </div>

          <div class="control">          
            <label class="label">Active</label>
            <drawing :sign="host.active" origin="yesno" size="2"></drawing>
          </div>

          <div class="control">          
            <label class="label">Created</label>
            <input class="input" type="text" readonly="readonly" v-model=host.created_at>
          </div>

          <div class="control">          
            <label class="label">Updated</label>
            <input class="input" type="text" readonly="readonly" v-model=host.updated_at>
          </div>   

          <div v-if="services">
            <div> 
              <h4>Services</h4>
              <table class="table is-bordered is-striped is-fullwidth is-hoverable">
                <thead>
                  <th>Name</th>
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
                    <td>{{ service.probe_name }}</td>
                    <td>{{ service.port }}</td>
                    <td>{{ service.uri }}</td>
                    <td class="has-text-centered">
                      <drawing :sign="service.active" origin="yesno"></drawing>
                    </td>
                    <td class="has-text-centered">
                      <div v-if="service.active">
                        <drawing :sign="service.status" origin="updown"></drawing>&nbsp{{ service.status_change | time-ago }}
                      </div>
                    </td>
                    <td class="has-text-centered">
                      <router-link :to="{ name: 'Service', params: { id: service.id }}">
                        <button type="button" class="view_button">View</button>                
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>              
            </div>
          </div>

        </div>

        <div class="column is-half">   
          <div> 
            Google Map
            <google-map v-if="ipLocal" v-bind:center="center" :width="600" :height="400"></google-map>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'
import GoogleMap from '@/components/Charts/GoogleMap'

export default {
  components: { Drawing, GoogleMap },  
  data () {
    return {
      host: null,
      services: [],
      id: null,
      title: 'Host',
      sign: null,
      baseURL: null,
      center: { lat: 43.6532, lng: -79.3832 },
      ipLocal: false
    }
  }, 
  mounted () {
    this.baseURL = process.env.API_BASE_URL   
    this.getHost ()
    this.getServices ()
  },
  methods: {
    getHost () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL+'/host/' + this.id, { crossdomain: true })
        .then(response => {
          this.host = response.data.data;
          this.title = 'Host: ' + this.host.name;
          this.getGeoData (this.host.ip);
        })
    },
    deleteHost (id) {
      axios
        .delete(this.baseURL+'/host/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'});
        })
    },
    getGeoData (ipAddress) {
      if (ipAddress != null && ipAddress != "127.0.0.1" && ipAddress != "localhost") {
        this.ipLocal = true;
        axios
          .get("https://api.ipdata.co/" + ipAddress)
          .then(response => {
            this.center = { lat: +response.data.latitude, lng: +response.data.longitude};
          })
      }
    },
    getServices () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL+'/host/' + this.id + '/services', { crossdomain: true })
        .then(response => {
          this.services = response.data.data;
        })
    },    
  }
}
</script>
