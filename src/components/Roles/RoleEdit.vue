/* eslint-disable */
<template>
  <div id="roleedit" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'Roles' }">
          <button class="button is-primary is-small is-rounded">Back</button>
        </router-link>
      </div>
    </div>

    <div class="container">
      <form v-on:submit="updateRole">
        <div class="card">

            <div class="control">          
              <label class="label">Name</label>
              <input class="form-control" type="text" v-model=role.name>
            </div>

            <div class="control">          
              <label class="label">Description</label>
              <input class="form-control" type="text" v-model=role.description>
            </div>

            <div class="control">          
              <label class="label">Active</label>
              <input class="form-control" type="checkbox" v-model="role.active">
            </div>

            <div align="center">
              <button type="submit" class="button is-small is-primary is-rounded">Update</button> 
            </div>
        </div>
        
      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Drawing from '@/components/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      role: {},
      errors: [],
      title: 'Edit Role',
      sign: null
    }
  },
  created () {
    this.getRole ()
  },  
  mounted () {
    this.getRole ()  
  },  
  methods: {
    getRole () {
      this.id = this.$route.params.id
      axios
        .get('http://localhost:8000/api/role/' + this.id, { crossdomain: true })
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
      axios
        .put('http://localhost:8000/api/role', oldRole, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/roles'})
        })
      e.preventDefault()
    }  
  }
}
</script>
