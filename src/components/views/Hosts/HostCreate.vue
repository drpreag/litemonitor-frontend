/* eslint-disable */
<template>
  <div id="hostscreate">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-3 text-right">
        <router-link :to="{ name:'Hosts' }">
          <button class="btn btn-sm btn-info">Back</button>
        </router-link>
      </div>
    </div>  

    <div class="row">
      <div class="col-lg-9">
        <form v-on:submit="addHost">
      
          <div class="form-group">          
            <label class="control-label">Name</label>
            <input class="form-control" type="text" minlength=5 v-model=host.name>
          </div>

          <div class="form-group">
            <label class="control-label">Description</label>
            <input class="form-control" type="text" minlength=5 v-model=host.description>
          </div>

          <div class="form-group">
            <label class="control-label">FQDN / IP address</label>
            <input class="form-control" type="text" minlength=10 v-model="host.fqdn">
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="host.active" @change="changeHandler">
            <label class="control-label">Active</label>
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
      host: {
        name: "",
        description: "",
        fqdn: "",
        active: false
      },
      id: null,
      errors: [],
      title: 'Add Host',
      sign: null,
    }
  },    
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    },
    addHost (e) {
      // browser side data validation will go here
      let newHost = {
        name: this.host.name,
        description: this.host.description,
        fqdn: this.host.fqdn,
        active: this.host.active === true ? 1 : 0
      } 
      //console.log (newHost);
      this.$http
        .post('/hosts', newHost)
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
        .catch(error => {
          this.errors = error;
        });        
      e.preventDefault()
    },
  }
}
</script>
