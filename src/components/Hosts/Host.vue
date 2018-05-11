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
        <div class="column field is-one-third">
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
        </div>

        <div class="column field">
          <div class="control">          
            <label class="label">ICMP probe</label>
            <drawing :sign="host.icmp_probe" origin="yesno"></drawing>
          </div>

          <div class="control">          
            <label class="label">ICMP status</label>
            <drawing :sign="host.icmp_status" origin="yesno"></drawing>
          </div>
        </div>

        <div class="column field is-quarter">
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
        </div>

        <div class="column field is-quarter">
          <div class="control">          
            <label class="label">Created</label>
            <input class="input" type="text" readonly="readonly" v-model=host.created_at>
          </div>

          <div class="control">          
            <label class="label">Updated</label>
            <input class="input" type="text" readonly="readonly" v-model=host.updated_at>
          </div>   
        </div>
      </div>

      <div class="columns">
        <div class="column field is-half">
          <div v-if="pings">
            Last 60 pings
            <table class="table is-bordered is-striped is-fullwidth is-hoverable">
              <thead>
                <th>Status</th>
                <th class="has-text-right">Avg speed</th>
                <th class="has-text-right">Total tests</th>
                <th class="has-text-right">Failed tests</th>
                <th>Timestamp</th>
              </thead>
              <tbody> 
                <tr v-for="ping in pings" :key="ping.id">
                  <td class="has-text-centered">
                    <drawing :sign="ping.status" origin="updown"></drawing>
                  </td>
                  <td class="has-text-right">{{ ping.avg_speed }}</td>
                  <td class="has-text-right">{{ ping.total_tests }}</td>
                  <td class="has-text-right">{{ ping.failed_tests }}</td>
                  <td>{{ ping.created_at }}</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
        <div class="column field is-half">   
          Line graph
          <line-pings-chart v-bind:passedData="passedData" :width="600" :height="400"></line-pings-chart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'
import LinePingsChart from '@/components/Charts/LinePingsChart'

export default {
  components: { Drawing, LinePingsChart },  
  data () {
    return {
      host: null,
      id: null,
      errors: [],
      pings: [],
      title: 'Host',
      sign: null,
      baseURL: null,
      passedData: []
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL   
    this.getPings ()
    this.getHost ()
  },
  methods: {
    getHost () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL+'/host/' + this.id, { crossdomain: true })
        .then(response => {
          this.host = response.data.data
          this.title = 'Host: ' + this.host.name
        })
    },
    deleteHost (id) {
      axios
        .delete(this.baseURL+'/host/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
    },
    getPings () {
      axios
        .get(this.baseURL+'/host/' + this.$route.params.id + /pings/, { crossdomain: true })
        .then(response => {
          this.pings = response.data.data
          for (var i in this.pings) {
            this.passedData[i]=[this.pings[i]['created_at'],this.pings[i]['avg_speed']];
          }
        })
    }
  }
}
</script>