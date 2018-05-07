/* eslint-disable */
<template>
  <div id="host" class="content">

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

    <div v-if="host" class="box">

      <div class="columns">
        <div class="column field is-three-quarters">
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
          </div>

          <div class="control">          
            <label class="label">ICMP probe</label>
            <drawing :sign="host.icmp_probe" origin="yesno"></drawing>
          </div>

          <div class="control">          
            <label class="label">ICMP status</label>
            <drawing :sign="host.icmp_status" origin="yesno"></drawing>
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
        </div>

        <div class="column is-one-quarters" align="right">
          <div class="control has-text-right">
            <router-link :to="{ name:'HostEdit', params: { id: host.id }}">
              <button class="button is-warning is-small is-rounded">Edit</button>
            </router-link>          
          </div>
          <div>&nbsp</div> 
          <div class="control has-text-right" >
            <button class="button is-danger is-small is-rounded" v-on:click="deleteHost(host.id)">
              Delete
            </button>
          </div>
        </div>  

      </div>
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
      host: null,
      id: null,
      errors: [],
      title: 'Host',
      sign: null
    }
  },
  created () {
    this.getHost ()
  },
  mounted () {
    this.getHost ()
  },
  methods: {
    getHost () {
      this.errors = this.host = this.id = null
      this.id = this.$route.params.id
      axios
        .get('http://localhost:8000/api/host/' + this.id, { crossdomain: true })
        .then(response => {
          this.host = response.data.data
          this.title = 'Host: ' + this.host.name
        })
    },
    deleteHost (id) {
      axios
        .delete('http://localhost:8000/api/host/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
    },
  }
}
</script>
