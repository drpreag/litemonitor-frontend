/* eslint-disable */
<template>
  <div id="rolescreate">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-3 text-right">
        <router-link :to="{ name:'Roles' }">
          <button class="btn btn-sm btn-info">Back</button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">      
        <form v-on:submit="addRole">

          <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model=role.name>
          </div>

          <div class="form-group">
            <label class="control-label">Description</label>
            <input class="form-control" type="text" v-model=role.description>
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
import Drawing from '@/components/Charts/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      role: {},
      errors: [],
      title: 'Add Role',
      sign: null,
      baseURL: null      
    }
  }, 
  methods: {
    addRole (e) {
      let newRole = {
        name: this.role.name,
        description: this.role.description
      }
      this.$http
        .post('/roles', newRole)
        .then(response => {
          this.$router.push({path:'/roles'})
        })
      e.preventDefault()
    } 
  }
}
</script>
