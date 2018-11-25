/* eslint-disable */
<template>
  <div id="host">

    <div v-if="host">

      <div class="row">
        <div class="col-lg-9">
          <h3>{{ title }}</h3>      
        </div>
        <div class="col-lg-3 text-right">
          <router-link :to="{ name:'Hosts' }">
            <button class="btn btn-sm btn-info">Back</button>
          </router-link>
          &nbsp
          <router-link :to="{ name:'HostEdit', params: { id: host.id }}">
            <button class="btn btn-sm btn-info">Edit</button>
          </router-link>          
          &nbsp
          <button class="btn btn-sm btn-info" v-on:click="deleteHost(host.id)">
            Delete
          </button>
        </div>
      </div>  

      <div class="row">

        <div class="col-lg-6">
          <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model="host.name" readonly="readonly">
          </div>

          <div class="form-group">
            <label class="control-label">Description</label>
            <input class="form-control" type="text" v-model="host.description" readonly="readonly">
          </div>

          <div class="form-group">
            <label class="control-label">FQDN</label>
            <input class="form-control" type="text" v-model="host.fqdn" readonly="readonly">
            <label class="control-label">IP address: {{ host.ip }}</label>
          </div>
        </div>

        <div class="col-lg-6">        
          <div class="form-group">
            <label class="control-label">Active</label><br>
            <drawing :sign="host.active" origin="yesno" size="2"></drawing>
          </div>

          <div class="form-group">
            <label class="control-label">Created</label>
            <input class="form-control" type="text" v-model="host.created_at" readonly="readonly">
          </div>

          <div class="form-group">
            <label class="control-label">Updated</label>
            <input class="form-control" type="text" v-model="host.updated_at" readonly="readonly">
          </div>
        </div>

      </div>        

      <div class="row">
        <div class="col-lg-6">           
          <div v-if="services">
            <br>
            <div> 
              <h4>Services</h4>
              <table class="table table-bordered table-striped table-condensed">
                <thead>
                  <th>Name</th>
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
                    <td>{{ service.probe_name }}</td>
                    <td>{{ service.port }}</td>
                    <td>{{ service.uri }}</td>
                    <td class="text-center">
                      <drawing :sign="service.active" origin="yesno"></drawing>
                    </td>
                    <td class="text-center">
                      <div v-if="service.active">
                        <drawing :sign="service.status" origin="updown"></drawing>&nbsp{{ service.status_change | time-ago }}
                      </div>
                    </td>
                    <td class="text-center">
                      <router-link :to="{ name: 'Service', params: { id: service.id }}">
                        <button class="btn btn-sm btn-info">View</button>                
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>              
            </div>
          </div>
        </div>

        <div class="col-lg-6">   
          <div> 
            Google Map
            <google-map v-if="ipLocal" v-bind:marker="marker" :width="600" :height="400"></google-map>            
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
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
      icon: null,
      sign: null,
      baseURL: null,
      center: { lat: 43.6532, lng: -79.3832 },
      ipLocal: false,
      markers: [],
      marker: {}
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
      this.$http
        .get('/hosts/' + this.id)
        .then(response => {
          this.host = response.data.data;
          this.title = this.host.name;
          if (this.host.active!=0 && this.host.ip!="" && this.host.ip!=null && this.host.ip!="127.0.0.1" && this.host.ip!="localhost") {
            this.ipLocal = true;
            this.center = { lat: parseFloat(this.host.latitude), lng: parseFloat(this.host.longitude) };

            this.marker.icon = '/static/icons/blue_pin_small.png'
            this.marker.title = this.title;
            this.marker.position = this.center;
          }   
        })
    },
    deleteHost (id) {
      this.$http
        .delete('/hosts/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'});
        })
    },
    getServices () {
      this.id = this.$route.params.id
      this.$http
        .get('/hosts/' + this.id + '/services', { crossdomain: true })
        .then(response => {
          this.services = response.data.data;
        })
    },    
  }
}
</script>
