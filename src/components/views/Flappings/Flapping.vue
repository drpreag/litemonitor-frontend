/* eslint-disable */
<template>
  <div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: 0,
      flapping: {}
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      //console.log ("Hosts: " + this.hosts.length);
      if (this.flapping.status == false) {  // play down music
        this.playSound ("down");
      }
      if (this.flapping.status == true) {  // play up music
        this.playSound ("up");
      }     
    } 
  },  
  created () {
    this.timer = setInterval(this.getNextId, 10000);
  },
  destroyed () {
    clearInterval(this.timer)
  },  
  mounted () {
    this.getLastId ()
  },
  methods: {
    getLastId () {
      this.$http
        .get('/flappings/last')
        .then(response => {
          this.id = response.data.data.id;
        })
        .catch(error => {
          this.errors = error;
        });          
    },
    getNextId () {
      this.$http
        .get('/flappings/' + this.id + '/next')
        .then(response => {
            this.flapping = response.data.data;
            this.id = response.data.data.id;
        })
        .catch(error => {
          this.errors = error;
        });
    },
    playSound (sound) {
        var audio = new Audio('/static/audio/'+sound+'.mp3');
        audio.play();
    }     
  }
}
</script>
