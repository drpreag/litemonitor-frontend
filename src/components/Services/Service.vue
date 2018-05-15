/* eslint-disable */
<template>
  <div id="service" class="content">

    <div v-if="service" class="box">

      <div class="columns">
        <div class="column is-three-quarters">
          <h3>{{ title }}</h3>      
        </div>
        <div class="column is-one-quarters add-new-resource">
          <router-link :to="{ name:'Services' }">
            <button class="button is-primary is-small is-rounded">Back</button>
          </router-link>
          &nbsp
          <router-link :to="{ name:'ServiceEdit', params: { id: service.id }}">
            <button class="button is-warning is-small is-rounded">Edit</button>
          </router-link>          
          &nbsp
          <button class="button is-danger is-small is-rounded" v-on:click="deleteService(service.id)">
            Delete
          </button>
        </div>
      </div>  

      <div class="columns">
        <div class="column field is-one-third">
          <div class="control">          
            <label class="label">Name</label>
            <input class="input" type="text" readonly="readonly" v-model=service.name>
          </div>

          <div class="control">          
            <label class="label">Host</label>
            <input class="input" type="text" readonly="readonly" v-model=service.host_name>
          </div>

          <div class="control">          
            <label class="label">Probe</label>
            <input class="input" type="text" readonly="readonly" v-model=service.probe_name>
          </div>
        </div>

        <div class="column field">
          <div class="control">          
            <label class="label">Active probe</label>
            <drawing :sign="service.active" origin="yesno"></drawing>
          </div>

          <div v-if="service.active" class="control">          
            <label class="label">Status</label>
            <drawing :sign="service.status" origin="yesno"></drawing>
          </div>
        </div>

        <div class="column field is-quarter">
          <div class="control">          
            <label class="label">Port</label>
            <input class="input" type="text" readonly="readonly" v-model=service.port>
          </div>

          <div class="control">          
            <label class="label">Uri</label>
            <input class="input" type="text" readonly="readonly" v-model=service.uri>
          </div>

          <div class="control">          
            <label class="label">Last status up</label>
            <input class="input" type="text" readonly="readonly" v-model=service.last_status_up>
          </div>
        </div>

        <div class="column field is-quarter">
          <div class="control">          
            <label class="label">Created</label>
            <input class="input" type="text" readonly="readonly" v-model=service.created_at>
          </div>

          <div class="control">          
            <label class="label">Updated</label>
            <input class="input" type="text" readonly="readonly" v-model=service.updated_at>
          </div>   
        </div>
      </div>

      <div class="columns">
        <div class="column field is-half">
          <div v-if="observations">
            Last 60 observations
            <table class="table is-bordered is-striped is-fullwidth is-hoverable">
              <thead>
                <th class="has-text-right">Status</th>
                <th class="has-text-right">Result</th>                
                <th class="has-text-right">Speed [ms]</th>
                <th>Timestamp</th>
              </thead>
              <tbody> 
                <tr v-for="observation in observations" :key="observation.id">
                  <td class="has-text-centered">
                    <drawing :sign="observation.status" origin="updown"></drawing>
                  </td>
                  <td class="has-text-right">{{ observation.result }}</td>
                  <td class="has-text-right">{{ observation.speed }}</td>                  
                  <td>{{ observation.created_at }}</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="loadedObservations==true && service.probe_id!=5" class="column field is-half">   
          Speed graph
          <line-observations-chart v-bind:observationData="observationData" :width="600" :height="400"></line-observations-chart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'
import LineObservationsChart from '@/components/Charts/LineObservationsChart'

export default {
  components: { Drawing, LineObservationsChart },  
  data () {
    return {
      service: null,
      id: null,
      errors: [],
      observations: [],
      title: 'Service',
      sign: null,
      baseURL: null,
      observationData: [],
      loadedObservations: false
    }
  },
  created () {
    this.timer = setInterval(this.getObservations, 30000);
  },
  destroyed () {
    clearInterval(this.timer)
  },    
  mounted () {
    this.baseURL = process.env.API_BASE_URL   
    this.id = this.$route.params.id    
    this.getObservations ()
    this.getService ()
  },
  methods: {
    getService () {
      axios
        .get(this.baseURL+'/service/' + this.id, { crossdomain: true })
        .then(response => {
          this.service = response.data.data
          this.title = 'Service: ' + this.service.name
        })
    },
    deleteService (id) {
      axios
        .delete(this.baseURL+'/service/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/services'})
        })
    },
    getObservations () {
      axios
        .get(this.baseURL+'/service/' + this.id + /observations/, { crossdomain: true })
        .then(response => {
          this.observations = response.data.data
          for (var i in this.observations) {
            this.observationData[i]=[this.observations[i]['created_at'],this.observations[i]['speed']];
          }
          this.loadedObservations = true;
        })
    }
  }
}
</script>