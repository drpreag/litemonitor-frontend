/**
 * Input:
 *  sign: 1 or 0 (represents true/false, deafult is true) 
 *  origin: "yesno" or "updown", default is updown so no need to specify it explicitly
 *  size: 
 * Primer: 
 *  <drawing :sign="1" origin="updown" size="2"></drawing>
 *    This will give html output in fontawsome representation for host that is up
 *    "fas fa-arrow-alt-circle-up fa-size-2x" in blue color
 */

<template>
    <i :class="drawing" :style="style" :size="size"></i>
</template>

<script>
export default {
  name: 'Drawing',
  props: { sign: {Number, default:1}, origin: { String, default: "updown"}, size: { Number, default: 1} }, 
  data: function () {
    return {
      drawing: '',
      style: ''
    }
  },  
  mounted () { 
    var sizeString = "fa-" + this.size + "x";

    if (this.origin=="yesno" & this.sign==1) {     
      this.drawing = "fas fa-check-circle " + sizeString 
      this.style = "color:#5BC0DD"
      // this.style = "color:#36a2eb"
    }
    if (this.origin=="yesno" & this.sign==0) {
      this.drawing = "fas fa-times-circle " + sizeString
      this.style = "color:#ff6384"
      // this.style = "color:#ff6384"
    }
    if (this.origin=="updown" & this.sign==1) {
      this.drawing = "fas fa-arrow-alt-circle-up " + sizeString
      //this.style = "color:#16E2F5"
      this.style = "color:#5BC0DD"      
    }
    if (this.origin=="updown" & this.sign==0) {
      this.drawing = "fas fa-arrow-alt-circle-down " + sizeString
      //this.style = "color:#F62817"
      this.style = "color:#ff6384"      
    }
  },

}
</script>