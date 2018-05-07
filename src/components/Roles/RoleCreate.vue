/* eslint-disable */
<template>
  <div id="rolecreate" class="content">

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
      <form v-on:submit="addRole">
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

          <div class="control">          
            <label class="label">Creator</label>
            <input class="form-control" type="number" v-model=role.creator_id>
          </div>

          <div align="center">
            <button type="submit" class="button is-small is-primary is-rounded">Submit</button> 
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
      title: 'Add Role',
      sign: null
    }
  }, 
  methods: {
    addRole (e) {
      let newRole = {
        name: this.role.name,
        description: this.role.description,
        creator_id: this.role.creator_id,        // currently logged in user, tb done yet
        active: this.role.active,
      }
      axios
        .post('http://localhost:8000/api/role', newRole, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/roles'})
        })
      e.preventDefault()
    } 
  }
}
</script>
