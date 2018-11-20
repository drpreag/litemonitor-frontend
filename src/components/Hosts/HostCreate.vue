/* eslint-disable */
<template>
  <div id="hostcreate" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'Hosts' }">
          <button class="button is-primary is-small is-rounded">Back</button>
        </router-link>
      </div>
    </div>  

    <div class="container">
      <form v-on:submit="addHost">
        <div class="card">

          <div class="control">          
            <label class="label">Name</label>
            <input class="form-control" type="text" minlength=5 v-model=host.name>
          </div>

          <div class="control">          
            <label class="label">Description</label>
            <input class="form-control" type="text" minlength=5 v-model=host.description>
          </div>

          <div class="control">          
            <label class="label">FQDN / IP address</label>
            <input class="form-control" type="text" minlength=10 v-model="host.fqdn">
          </div>

          <div class="control">          
            <label class="label">Active</label>
            <input class="form-control" type="checkbox" v-model="host.active" @change="changeHandler">            
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
import Drawing from '@/components/Charts/Drawing'

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
      baseURL: null  
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL
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
      axios
        .post(this.baseURL+'/hosts', newHost, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
      e.preventDefault()
    },
  }
}
</script>
