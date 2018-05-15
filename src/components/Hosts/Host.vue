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
            IP address: {{ host.ip }}
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
        <div v-if="pings && host.icmp_probe==true" class="column field is-half">
          <div>
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

        <div v-if="loadedPings==true && host.icmp_probe==true" class="column field is-half">   
          <div>
            Speed graph
            <line-pings-chart v-bind:pingData="pingData" :width="600" :height="400"></line-pings-chart>
          </div>
          <div> 
            <google-map v-if="ipLocal" v-bind:center="center" :width="600" :height="400"></google-map>
          </div>
        </div>          
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'
import LinePingsChart from '@/components/Charts/LinePingsChart'
import GoogleMap from '@/components/Charts/GoogleMap'

export default {
  components: { Drawing, LinePingsChart, GoogleMap },  
  data () {
    return {
      host: null,
      id: null,
      errors: [],
      pings: [],
      title: 'Host',
      sign: null,
      baseURL: null,
      passedData: [],
      pingData: [],
      loadedPings: false,
      center: {},
      ipLocal: false
    }
  },
  created () {
    this.timer = setInterval(this.getPings, 30000);
  },
  destroyed () {
    clearInterval(this.timer)
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
    getPings () {
      axios
        .get(this.baseURL+'/host/' + this.$route.params.id + /pings/, { crossdomain: true })
        .then(response => {
          this.pings = response.data.data;
          for (var i in this.pings) {
            this.passedData[i]=[this.pings[i]['created_at'],this.pings[i]['avg_speed']];
          }
          this.pingData = this.passedData.reverse();
          this.loadedPings = true;
        })
    },
    getGeoData (ipAddress) {
      if (ipAddress != "127.0.0.1" && ipAddress != "localhost") {
        this.ipLocal = true;
        axios
          .get("https://api.ipdata.co/" + ipAddress)
          .then(response => {
            this.center = { lat: +response.data.latitude, lng: +response.data.longitude} ;
          })
      }
    }
  }
}
</script>
