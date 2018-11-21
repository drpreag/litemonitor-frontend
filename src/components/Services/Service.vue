/* eslint-disable */
<template>
  <div id="service">

    <div v-if="service">

      <div class="row">
        <div class="col-lg-9">
          <h3>{{ title }}</h3>      
        </div>
        <div class="col-lg-3 text-right">
          <router-link :to="{ name:'Services' }">
            <button class="btn btn-sm btn-info">Back</button>
          </router-link>
          &nbsp
          <router-link :to="{ name:'ServiceEdit', params: { id: service.id }}">
            <button class="btn btn-sm btn-info">Edit</button>
          </router-link>          
          &nbsp
          <button class="btn btn-sm btn-info" v-on:click="deleteService(service.id)">
            Delete
          </button>
        </div>
      </div>  

      <div class="row">

        <div class="col-lg-6">
          <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model="service.name" readonly="readonly">
          </div>

          <div class="form-group">
            <label class="control-label">Host</label>
            <input class="form-control" type="text" v-model="service.host_name" readonly="readonly">
          </div>

          <div class="form-group">
            <label class="control-label">Probe</label>
            <input class="form-control" type="text" v-model="service.probe_name" readonly="readonly">
          </div>

          <div class="form-group">    
            <label class="control-label">Port</label>
            <input class="form-control" type="text" readonly="readonly" v-model="service.port">
          </div>

          <div class="form-group">       
            <label class="control-label">Uri</label>
            <input class="form-control" type="text" readonly="readonly" v-model="service.uri">
          </div>          
        </div>

        <div class="col-lg-3">        
          <div class="form-group">       
            <label class="control-label">Last status change</label>
            <input class="form-control" type="text" readonly="readonly" v-model=service.status_change>
          </div>
          <div class="form-group">       
            <label class="control-label">Last status down</label>
            <input class="form-control" type="text" readonly="readonly" v-model=service.last_status_down>
          </div>
          <div class="form-group">  
            <label class="control-label">Last status up</label>
            <input class="form-control" type="text" readonly="readonly" v-model=service.last_status_up>
          </div>          
        </div>

        <div class="col-lg-3">
          <div class="form-group">
            <label class="control-label">Active probe</label><br>
            <drawing :sign="service.active" origin="yesno" size="2"></drawing>
          </div>

          <div v-if="service.active" class="form-group">
            <label class="control-label">Status</label><br>
            <drawing :sign="service.status" origin="yesno" size="2"></drawing>
          </div>

          <div class="form-group">       
            <label class="control-label">Created</label>
            <input class="form-control" type="text" readonly="readonly" v-model=service.created_at>
          </div>

          <div class="form-group">       
            <label class="control-label">Updated</label>
            <input class="form-control" type="text" readonly="readonly" v-model=service.updated_at>
          </div>   
        </div>

      </div>

      <div class="row">
        <div class="col-lg-6">
          <div v-if="observations" class="table-container">
            <br>
            <h4>Last 60 observations</h4>
            <table class="table table-bordered table-striped table-condensed">
              <thead>
                <th class="text-center">Status</th>
                <th class="text-right">Result</th>                
                <th class="text-right">Speed [ms]</th>
                <th>Timestamp</th>
              </thead>
              <tbody>          
                <tr v-for="observation in observations" :key="observation.id">
                  <td class="text-center">
                    <drawing :sign="observation.status" origin="updown"></drawing>
                  </td>
                  <td class="text-right">{{ observation.result }}</td>
                  <td class="text-right">{{ observation.speed | two-decimals }}</td>
                  <td>{{ observation.created_at }}</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="loadedObservations==true && service.draw_graph==true" class="col-lg-6">   
          Speed graph
          <line-observations-chart v-bind:observationData="observationData" :width="600" :height="400"></line-observations-chart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Charts/Drawing'
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
      loadedObservations: false,
      observationData: []
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
    this.getService ()
    this.getObservations ()
  },
  methods: {
    getService () {
      axios
        .get(this.baseURL+'/services/' + this.id, { crossdomain: true })
        .then(response => {
          this.service = response.data.data
          this.title = 'Service: ' + this.service.name
        })
    },
    deleteService (id) {
      axios
        .delete(this.baseURL+'/services/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/services'})
        })
    },
    getObservations () {
      axios
        .get(this.baseURL+'/services/' + this.id + /observations/, { crossdomain: true })
        .then(response => {
          this.observations = response.data.data;
          this.observationData = [];
          for (var i in this.observations) 
            this.observationData[i]=[this.observations[i]['created_at'],this.observations[i]['speed']];     
          this.loadedObservations = true;
        })
    }
  }
}
</script>