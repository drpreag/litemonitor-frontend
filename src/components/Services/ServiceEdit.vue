/* eslint-disable */
<template>
  <div id="servicecreate" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'Services' }">
          <button class="button is-primary is-small is-rounded">Back</button>
        </router-link>
      </div>
    </div>  

    <div class="container">
      <form v-on:submit="updateService">
        <div class="card">

          <div class="control">          
            <label class="label">Name</label>
            <input class="form-control" type="text" minlength=5 v-model=service.name>
          </div>

          <div class="control">          
            <label class="label">Host</label>
            <select class="input" v-model="service.host_id">
              <option v-for="host in hosts" :value="host.id">
                {{ host.name }}
              </option>
            </select>                
          </div>

          <div class="control">          
            <label class="label">Probe</label>
            <select class="input" v-model="service.probe_id">
              <option v-for="probe in probes" :value="probe.id">
                {{ probe.name }}
              </option>
            </select>                
          </div>

          <div class="control">          
            <label class="label">Port</label>
            <input class="form-control" type="text" minlength=2 v-model=service.port>
          </div>

          <div class="control">          
            <label class="label">URI</label>
            <input class="form-control" type="text" minlength=5 v-model="service.uri">
          </div>

          <div class="control">          
            <label class="label">Active</label>
            <input class="form-control" type="checkbox" v-model="service.active" @change="changeHandler">
          </div>

          <div class="control">          
            <label class="label">Username</label>
            <input class="form-control" type="text" minlength=5 v-model=service.user>
          </div>

          <div class="control">          
            <label class="label">Password</label>
            <input class="form-control" type="text" minlength=10 v-model="service.pass">
          </div>

          <div align="center">
            <button type="submit" class="button is-small is-primary is-rounded">Submit</button> 
          </div>

        </div>
        
      </form>
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
      /*service: {
        name: null,
        host_id: null,
        probe_id: null,
        port: null,
        uri: null,
        active: false,
        user: null,
        pass: null,          
      },*/
      service: {},
      id: null,
      errors: [],
      title: 'Edit Service',
      sign: null,
      baseURL: null,
      probes: [],
      hosts: [],  
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL
    this.getHosts ()
    this.getProbes ()
    this.getService ()
  },    
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    },  
    getService () {
      this.id = this.$route.params.id    
      axios  
        .get(this.baseURL+'/service/' + this.id, { crossdomain: true })
        .then(response => {
          this.service = response.data.data;          
          this.title = 'Service: ' + this.service.name
        });
    },    
    updateService (e) {
      // browser side data validation will go here
      let oldService = {
        id: this.id,      
        name: this.service.name,
        host_id: this.service.host_id,
        probe_id: this.service.probe_id,
        port: this.service.port,
        uri: this.service.uri,
        active: this.service.active == true ? 1 : 0,
        user: this.service.user,
        pass: this.service.pass,        
      } 
      //console.log(this.service.active);
      axios
        .put(this.baseURL+'/service', oldService, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/services'})
        });
      e.preventDefault()
    },
    getHosts () {
      axios  
        .get(this.baseURL+'/hosts', { crossdomain: true })
        .then(response => {
          this.hosts = response.data.data;
        });
    },
    getProbes () {
      axios  
        .get(this.baseURL+'/probes', { crossdomain: true })
        .then(response => {
          this.probes = response.data.data;
        });
    },
  }
}
</script>
