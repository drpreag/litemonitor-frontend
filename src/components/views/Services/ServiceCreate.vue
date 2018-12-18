/* eslint-disable */
<template>
  <div id="servicescreate">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-3 text-right">
        <router-link :to="{ name:'Services' }">
          <button class="btn btn-sm btn-info">Back</button>
        </router-link>
      </div>
    </div>  

    <div class="row">
      <div class="col-lg-9">      
        <form v-on:submit="addService">

          <div class="form-group">          
            <label class="control-label">Name</label>
            <input class="form-control" type="text" minlength=3 v-model=service.name>
          </div>

          <div class="form-group">          
            <label class="control-label">Host</label>
            <select class="form-control" v-model="service.host_id">
              <option v-for="host in hosts" :value="host.id">
                {{ host.name }}
              </option>
            </select>
          </div>

          <div class="form-group">          
            <label class="control-label">Probe</label>
            <select class="form-control" v-model="service.probe_id">
              <option v-for="probe in probes" :value="probe.id">
                {{ probe.name }}
              </option>
            </select>                
          </div>

          <div class="form-group">
            <label class="control-label">Port</label>
            <input class="form-control" type="text" minlength=2 v-model=service.port>
          </div>

          <div class="form-group">          
            <label class="control-label">URI</label>
            <input class="form-control" type="text" minlength=5 v-model="service.uri">
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="service.active" @change="changeHandler">
            <label class="control-label">Active</label>
          </div>

          <div class="form-group">          
            <label class="control-label">Username</label>
            <input class="form-control" type="text" minlength=3 v-model=service.user>
          </div>

          <div class="form-group">          
            <label class="control-label">Password</label>
            <input class="form-control" type="text" minlength=6 v-model="service.pass">
          </div>

          <div align="center">
            <button type="submit" class="btn btn-sm btn-info">Update</button> 
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      service: {
        name: null,
        host_id: null,
        probe_id: null,
        port: null,
        uri: null,
        active: false,
        user: null,
        pass: null,          
      },
      id: null,
      errors: [],
      title: 'Add Service',
      sign: null,
      baseURL: null,
      probes: [],
      hosts: [],  
    }
  },
  mounted () {
    this.getHosts ()
    this.getProbes ()
  },    
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    },  
    addService (e) {
      // browser side data validation will go here
      let newService = {
        name: this.service.name,
        host_id: this.service.host_id,
        probe_id: this.service.probe_id,
        port: this.service.port,
        uri: this.service.uri,
        active: this.service.active === true ? 1 : 0,
        user: this.service.user,
        pass: this.service.pass     
      } 
      this.$http
        .post('/services', newService, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/services'})
        })
        .catch(error => {
          this.errors = error;
        });        
      e.preventDefault()
    },
    getHosts () {
      this.$http
        .get('/hosts', { crossdomain: true })
        .then(response => {
          this.hosts = response.data.data;
        })
        .catch(error => {
          this.errors = error;
        });        
    },
    getProbes () {
      this.$http
        .get('/probes', { crossdomain: true })
        .then(response => {
          this.probes = response.data.data;
        })
        .catch(error => {
          this.errors = error;
        });        
    },
  }
}
</script>
