/* eslint-disable */
<template>
  <div id="Hostedit">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-3 text-right">
        <router-link :to="{ name:'Hosts' }">
          <button class="btn btn-sm btn-info">Back</button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <form v-on:submit="updateHost">

          <div class="form-group">          
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model=host.name>
          </div>

          <div class="form-group">
            <label class="control-label">Description</label>
            <input class="form-control" type="text" v-model=host.description>
          </div>
          
          <div class="form-group">
            <label class="control-label">Fqdn</label>
            <input class="form-control" type="text" v-model=host.fqdn>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="host.active" @change="changeHandler">
            <label class="control-label">Active</label>
          </div>

          <div class="form-group">
            <label class="control-label">Created</label>
            <input class="form-control" type="text" readonly="readonly" v-model=host.created_at>
          </div>

          <div class="form-group">
            <label class="control-label">Updated</label>
            <input class="form-control" type="text" readonly="readonly" v-model=host.updated_at>
          </div>   

          <div align="center">
            <button type="submit" class="btn btn-sm btn-info">Update</button> 
          </div>
        </form>
      </div>        
    </div>
  </div>
</template>

<script>
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      id: null,
      host: {
        name: "",
        description: "",
        fqdn: "",
        active: true
      },      
      errors: [],
      title: 'Edit Host',
      sign: null
    }
  },  
  mounted () {
    this.getHost () 
  },  
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    },  
    getHost () {
      this.id = this.$route.params.id
      this.$http
        .get('/hosts/' + this.id)
        .then(response => {
          this.host = response.data.data
          this.title = 'Host: ' + this.host.name
        })
    },  
    updateHost (e) {
      let oldHost = {
        id: this.id,       
        name: this.host.name,
        description: this.host.description,
        fqdn: this.host.fqdn,
        active: this.host.active == true ? 1 : 0        
      }
      this.$http
        .put('/hosts/', oldHost)
        .then(response => {
          this.$router.push({path:'/hosts'})
        })
        .catch(error => {
          console.log(error)
          this.errors = error;
          this.$router.go(-1);
        });
      e.preventDefault()
    }
  }
}
</script>
