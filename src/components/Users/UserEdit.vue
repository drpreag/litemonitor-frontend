/* eslint-disable */
<template>
  <div id="useredit" class="content">

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
      <form v-on:submit="updateUser">
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
              <input class="form-control" type="checkbox" v-model="user.active" @change="changeHandler">
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
      id: null,
      user: {},
      roles: [],
      errors: [],
      title: 'Edit User',
      sign: null,
      baseURL: null  
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL    
    this.getRoles ()   
    this.getUser ()
  },  
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    }, 
    getUser () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL+'/user/' + this.id, { crossdomain: true })
        .then(response => {
          this.user = response.data.data
          this.title = 'User: ' + this.user.name
        })
    },  
    updateUser (e) {
      let oldUser = {
        id: this.id,
        name: this.user.name,
        email: this.user.email,
        active: this.user.active == true ? 1 : 0,
        role_id: this.user.role_id == true ? 1 : 0,
      }
      axios
        .put(this.baseURL+'/user/', oldUser, { crossdomain: true })
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
