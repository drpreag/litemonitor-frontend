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
            <input class="form-control" type="text" v-model=host.name>
          </div>

          <div class="control">          
            <label class="label">Description</label>
            <input class="form-control" type="text" v-model=host.description>
          </div>

          <div class="control">          
            <label class="label">FQDN / IP address</label>
            <input class="form-control" type="text" v-model="host.fqdn">
          </div>

          <div class="control">          
            <label class="label">ICMP probe</label>
            <input class="form-control" type="checkbox" v-model="host.icmp_probe">
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
      host: {},
      id: null,
      errors: [],
      title: 'Add Host',
      sign: null
    }
  },
  methods: {
    addHost (e) {
      let newHost = {
        name: this.host.name,
        description: this.host.description,
        fqdn: this.host.fqdn,
        icmp_probe: this.host.icmp_probe
      } 
      axios
        .post('http://localhost:8000/api/host', newHost, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
      e.preventDefault()
    },
  }
}
</script>
