/* eslint-disable */
<template>
  <div id="roleedit">

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
        <form v-on:submit="updateRole">

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
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      role: {},
      errors: [],
      title: 'Edit Role',
      sign: null,
      baseURL: null
    }
  },
  mounted () {
    this.getRole ()  
  },  
  methods: {
    getRole () {
      this.id = this.$route.params.id
      this.$http
        .get('/roles/' + this.id)
        .then(response => {
          this.role = response.data.data
          this.title = 'Role: ' + this.role.name          
        })
    },  
    updateRole (e) {
      let oldRole = {
        id: this.id,
        name: this.role.name,
        description: this.role.description,
        active: this.role.active,
        creator_id: this.role.creator_id
      }
      this.$http
        .put('/roles', oldRole, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/roles'})
        })
      e.preventDefault()
    }  
  }
}
</script>