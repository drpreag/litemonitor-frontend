/* eslint-disable */
<template>
  <div id="home">

    <div class="container text-center" style="padding-top:60px;">
      <h4>Welcome to</h4><br>
      
      <img src="/static/icons-144.png"/>
      <h3>LiteMonitor</h3><br>

      <h4>simple agent-less remote monitoring tool !</h4>      
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },
  data () {
    return {
      title: 'Home',
      errors: []
    }
  },
  methods: {
    
  }
}
</script>

