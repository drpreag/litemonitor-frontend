/* eslint-disable */
<template>
  <div id="user" class="content">

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

    <div v-if="user" class="box">

      <div class="columns">
        <div class="column field is-three-quarters">
          <div class="control">          
            <label class="label">Name</label>
            <input class="input" type="text" readonly="readonly" v-model=user.name>
          </div>

          <div class="control">          
            <label class="label">Email</label>
            <input class="input" type="text" readonly="readonly" v-model=user.email>
          </div>

          <div class="control">          
            <label class="label">Active</label>
            <drawing :sign="user.active" origin="yesno"></drawing>
          </div>

          <div class="control">          
            <label class="label">Role</label>
              <select class="input" v-model="user.role_id">
                <option v-for="role in roles" :value="user.role_id">
                  {{ role.name }}
                </option>
              </select>
          </div>

          <div class="control">          
            <label class="label">Created</label>
            <input class="input" type="text" readonly="readonly" v-model=user.created_at>
          </div>

          <div class="control">          
            <label class="label">Updated</label>
            <input class="input" type="text" readonly="readonly" v-model=user.updated_at>
          </div>   
        </div>

        <div class="column is-one-quarters" align="right">
          <div class="control has-text-right">
            <router-link :to="{ name:'UserEdit', params: { id: user.id }}">
              <button class="button is-warning is-small is-rounded">Edit</button>
            </router-link>          
          </div>
          <div>&nbsp</div> 
          <div class="control has-text-right" >
            <button class="button is-danger is-small is-rounded" v-on:click="deleteUser(user.id)">
              Delete
            </button>
          </div>
        </div>  

      </div>
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
      user: null,
      roles: [],
      id: null,
      errors: [],
      title: 'User',
      sign: null
    }
  },
  created () {
    this.getUser ()
    this.getRoles()
  },
  mounted () {
    this.getUser ()
  },
  methods: {
    getUser () {
      this.errors = this.user = this.id = null
      this.id = this.$route.params.id
      axios
        .get('http://localhost:8000/api/user/' + this.id, { crossdomain: true })
        .then(response => {
          this.user = response.data.data
          this.title = 'User: ' + this.user.name          
        })
    },
    deleteUser (id) {
      axios
        .delete('http://localhost:8000/api/user/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/users'})
        })
    },
    getRoles () {
      this.$http.get('http://localhost:8000/api/roles')
      .then(response => {
        this.roles = response.body.data;
      });
    }     
  }
}
</script>
