/* eslint-disable */
<template>
  <div id="Hostedit" class="content">

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
      <form v-on:submit="updateHost">
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
            <label class="label">Fqdn</label>
            <input class="form-control" type="text" v-model=host.fqdn>
          </div>

          <div class="control">          
            <label class="label">ICMP probe</label>
            <input class="form-control" type="checkbox" v-model="host.icmp_probe" @change="changeHandler">
          </div>
        
          <div class="control">          
            <label class="label">Status change</label>
            <input class="input" type="text" readonly="readonly" v-model=host.status_change>
          </div>

          <div class="control">          
            <label class="label">Last status down</label>
            <input class="input" type="text" readonly="readonly" v-model=host.last_status_down>
          </div>

          <div class="control">          
            <label class="label">Last status up</label>
            <input class="input" type="text" readonly="readonly" v-model=host.last_status_up>
          </div>   

          <div class="control">          
            <label class="label">Created</label>
            <input class="input" type="text" readonly="readonly" v-model=host.created_at>
          </div>

          <div class="control">          
            <label class="label">Updated</label>
            <input class="input" type="text" readonly="readonly" v-model=host.updated_at>
          </div>   

          <div align="center">
            <button type="submit" class="button is-small is-primary is-rounded">Update</button> 
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
      id: null,
      //host: {},
      host: {
        name: "",
        description: "",
        fqdn: "",
        icmp_probe: false
      },      
      errors: [],
      title: 'Edit Host',
      sign: null,
      baseURL: null        
    }
  },  
  mounted () {
    this.baseURL = process.env.API_BASE_URL   
    this.getHost () 
  },  
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    },  
    getHost () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL+'/host/' + this.id, { crossdomain: true })
        .then(response => {
          this.host = response.data.data
          this.title = 'Host: ' + this.host.name
        })
    },  
    updateHost (e) {
      let oldHost = {
        id: this.id,       
        name: this.host.name,
        description: this.host.description,
        fqdn: this.host.fqdn,
        icmp_probe: this.host.icmp_probe == true ? 1 : 0        
      }
      axios
        .put(this.baseURL+'/host/', oldHost, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
      e.preventDefault()
    }
  }
}
</script>
