/* eslint-disable */
<template>
  <div id="usercreate" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'Users' }">
          <button class="button is-primary is-small is-rounded">Back</button>
        </router-link>
      </div>
    </div>

    <div class="container">
      <form v-on:submit="addUser">
        <div class="card">

          <div class="control">          
            <label class="label">Name</label>
            <input class="form-control" type="text" v-model=user.name>
          </div>

          <div class="control">          
            <label class="label">Email</label>
            <input class="form-control" type="email" v-model=user.email>
          </div>

          <div class="control">          
            <label class="label">Active</label>
            <input class="form-control" type="checkbox" v-model="user.active">
          </div>

          <div class="control">          
            <label class="label">Role</label>
            <select class="input" v-model="user.role_id">
              <option v-for="role in roles" :value="role.id">
                {{ role.name }}
              </option>
            </select>                
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
import Drawing from '@/components/Charts/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      user: {},
      roles: [],
      errors: [],
      title: 'Add User',
      sign: null,
      baseURL: null
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL    
    this.getRoles ()   
  },   
  methods: {
    addUser (e) {
      let newUser = {
        name: this.user.name,
        email: this.user.email,
        active: this.user.active === true ? 1 : 0,
        role_id: this.user.role_id,
      }
      axios
        .post(this.baseURL+'/users', newUser, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/users'})
        })
      e.preventDefault()
    },
    getRoles () {
      axios
        .get(this.baseURL+'/roles', { crossdomain: true })
        .then(response => {
          this.roles = response.data.data;
        });
    } 
  }
}
</script>
