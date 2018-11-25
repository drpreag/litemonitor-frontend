/* eslint-disable */
<template>
  <div id="usercreate">

    <div class="row">
      <div class="col-lg-9">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-3 text-right">
        <router-link :to="{ name:'Users' }">
          <button class="btn btn-sm btn-info">Back</button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <form v-on:submit="addUser">

          <div class="form-group">          
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model=user.name>
          </div>

          <div class="form-group">          
            <label class="control-label">Email</label>
            <input class="form-control" type="email" v-model=user.email>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model=user.active @change="changeHandler">
            <label class="control-label">Active</label>
          </div>

          <div class="form-group">          
            <label class="control-label">Role</label>
            <select class="form-control" v-model="user.role_id">
              <option v-for="role in roles" :value="role.id">
                {{ role.name }}
              </option>
            </select>                
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
      this.$http
        .post('/users', newUser, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/users'})
        })
      e.preventDefault()
    },
    getRoles () {
      this.$http
        .get('/roles', { crossdomain: true })
        .then(response => {
          this.roles = response.data.data;
        });
    } 
  }
}
</script>
