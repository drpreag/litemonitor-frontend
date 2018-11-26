/* eslint-disable */
<template>
  <div id="user">

    <div v-if="user">

      <div class="row">
        <div class="col-lg-9">
          <h3>{{ title }}</h3>      
        </div>
        <div class="col-lg-3 text-right">
          <router-link :to="{ name:'Users' }">
            <button class="btn btn-sm btn-info">Back</button>
          </router-link>
          &nbsp
          <router-link :to="{ name:'UserEdit', params: { id: user.id }}">
            <button class="btn btn-sm btn-info">Edit</button>
          </router-link>            
          &nbsp
          <button class="btn btn-sm btn-info" v-on:click="deleteUser(user.id)">
            Delete
          </button>
        </div>
      </div> 

      <div class="row">
        <div class="col-lg-9">
          <div class="form-group">          
            <label class="control-label">Name</label>
            <input class="form-control" type="text" readonly="readonly" v-model=user.name>
          </div>

          <div class="form-group">          
            <label class="control-label">Email</label>
            <input class="form-control" type="text" readonly="readonly" v-model=user.email>
          </div>

          <div class="form-group">
            <label class="control-label">Active</label>
            <drawing :sign="user.active" origin="yesno"></drawing>
          </div>

          <div class="form-group">
            <label class="control-label">Role</label>
              <select class="form-control" readonly="readonly" disabled="disabled" v-model="user.role_id">
                <option v-for="role in roles" :value="role.id" >
                  {{ role.name }}
                </option>
              </select>
          </div>

          <div class="form-group">
            <label class="control-label">Created</label>
            <input class="form-control" type="text" readonly="readonly" v-model=user.created_at>
          </div>

          <div class="form-group">          
            <label class="control-label">Updated</label>
            <input class="form-control" type="text" readonly="readonly" v-model=user.updated_at>
          </div>   
        </div>

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
      user: null,
      id: null,
      errors: [],
      title: 'User',
      sign: null,
      roles: [],
    }
  },
  mounted () {
    this.id = this.$route.params.id     
    this.getRoles ()    
    this.getUser ()
  },
  methods: {
    getUser () {
      this.$http
        .get('/users/' + this.id, { crossdomain: true })
        .then(response => {
          this.user = response.data.data
          this.title = 'User: ' + this.user.name
        })
    },
    deleteUser (id) {
      this.$http
        .delete('/users/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/users'})
        })
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