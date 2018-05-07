/* eslint-disable */
<template>
  <div id="dashboard" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
      </div>
    </div>

    <div v-if="flappings">
      <table class="table is-bordered is-striped is-hoverable is-narrow">
        <thead>
          <th>Host</th>
          <th>Service</th>
          <th>Comment</th>
          <th class="has-text-centered">Status change</th>
          <th>Changed at</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="flapping in flappings" :key="flapping.id">
            <td>{{ flapping.host_name }}</td>
            <td>{{ flapping.service_name }}</td>
            <td>{{ flapping.comment }}</td>            
            <td class="has-text-centered">
              <drawing :sign="flapping.status" origin="updown"></drawing>
            </td>
            <td>{{ flapping.created_at | timeago }}</td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'

export default {
  components: { Drawing, ChartPie },
  data () {
    return {
      title: 'Dashboard',
      flappings: []
    }
  },
  created () {
    this.getFlappings()
    this.timer = setInterval(this.getFlappings, 10000)
  },
  destroyed () {
    clearInterval(this.timer)
  },  
  methods: {
    getFlappings () {
      axios
        .get('http://localhost:8000/api/flappings/', { crossdomain: true })
        .then(response => {
          this.flappings = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })        
    }
  }
}
</script>

