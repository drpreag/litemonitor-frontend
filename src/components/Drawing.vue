/**
 * Foor input string: true, false, up or down 
 * returns fon awsome representation
 * inside <drawing/>
 */

<template>
    <i :class="drawing" :style="style"></i>
</template>

<script>
export default {
  name: 'Drawing',
  props: {
    sign:  {
      type: Number
    },
    origin: {
      type: String
    }

  }, 
  data: function () {
    return {
      drawing: '',
      style: ''
    }
  },  
  created () {
    if (this.origin=="yesno" & this.sign==1) {     
      this.drawing = "far fa-check-circle fa-2x" 
      this.style = "color:#16E2F5"
    }
    if (this.origin=="yesno" & this.sign==0) {
      this.drawing = "far fa-times-circle fa-2x" 
      this.style = "color:#F62817"
    }
    if (this.origin=="updown" & this.sign==1) {
      this.drawing = "far fa-arrow-alt-circle-up fa-2x" 
      this.style = "color:#16E2F5"
    }
    if (this.origin=="updown" & this.sign==0) {
      this.drawing = "far fa-arrow-alt-circle-down fa-2x" 
      this.style = "color:#F62817"
    }
  },  
  mounted () {
    if (this.origin=="yesno" & this.sign==1) {     
      this.drawing = "far fa-check-circle fa-2x" 
      this.style = "color:#16E2F5"
    }
    if (this.origin=="yesno" & this.sign==0) {
      this.drawing = "far fa-times-circle fa-2x" 
      this.style = "color:#F62817"
    }
    if (this.origin=="updown" & this.sign==1) {
      this.drawing = "far fa-arrow-alt-circle-up fa-2x" 
      this.style = "color:#16E2F5"
    }
    if (this.origin=="updown" & this.sign==0) {
      this.drawing = "far fa-arrow-alt-circle-down fa-2x" 
      this.style = "color:#F62817"
    }
  },

}
</script>