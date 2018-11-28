/* eslint-disable */
<template>
  <div id="useredit">

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
        <form v-on:submit="updateUser">
          <div class="form-group">
            <label class="control-label">Name</label>
            <input class="form-control" type="text" v-model=user.name>
          </div>

          <div class="form-group">
            <label class="control-label">Email</label>
            <input class="form-control" type="email" v-model=user.email readonly="readonly">
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model=user.active @change="changeHandler">
            <label class="control-label">Active</label>
          </div>

          <div class="form-group">
            <label class="control-label">Role</label>
            <select class="form-control" v-model=user.role_id>
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
import Drawing from '@/components/Charts/Drawing'

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
    }
  },
  mounted () {
    this.getRoles ()   
    this.getUser ()
  },  
  methods: {
    changeHandler () {
      this.$emit('input', !this.value)
    }, 
    getUser () {
      this.id = this.$route.params.id
      this.$http
        .get('/users/' + this.id, { crossdomain: true })
        .then(response => {
          this.user = response.data.data
          this.title = 'User: ' + this.user.name
        })
        .catch(error => {
          this.errors = error;
        });        
    },  
    updateUser (e) {
      let oldUser = {
        id: this.id,
        name: this.user.name,
        email: this.user.email,
        active: this.user.active == true ? 1 : 0,
        role_id: this.user.role_id
      }
      this.$http
        .put('/users/', oldUser, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/users'})
        })
        .catch(error => {
          this.errors = error;
        });        
      e.preventDefault()
    },
    getRoles () {
      this.$http
        .get('/roles', { crossdomain: true })
        .then(response => {
          this.roles = response.data.data;
        })
        .catch(error => {
          this.errors = error;
        });        
    }    
  }
}
</script>
