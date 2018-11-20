/* eslint-disable */
<template>
  <div id="role" class="content">

      <div v-if="role" class="box">

        <div class="columns">
          <div class="column is-three-quarters">
            <h3>{{ title }}</h3>      
          </div>
          <div class="column is-one-quarters add-new-resource">
            <router-link :to="{ name:'Roles' }">
              <button class="button is-primary is-small is-rounded">Back</button>
            </router-link>
            &nbsp
            <router-link :to="{ name:'RoleEdit', params: { id: role.id }}">
              <button class="button is-warning is-small is-rounded">Edit</button>
            </router-link>            
            &nbsp
            <button class="button is-danger is-small is-rounded" v-on:click="deleteRole(role.id)">
              Delete
            </button>            
          </div>
        </div>  

        <div class="columns">
          <div class="column field is-three-quarters">
            <div class="control">
              <label class="label">Id</label>
              <input class="input" type="text" readonly="readonly" v-model=role.id>
            </div>
        
            <div class="control">
              <label class="label">Name</label>
              <input class="input" type="text" readonly="readonly" v-model=role.name>
            </div>
         
            <div class="control">
              <label class="label">Description</label>
              <input class="input" type="text" readonly="readonly" v-model=role.description>
            </div>

            <div class="control">          
              <label class="label">Created</label>
              <input class="input" type="text" readonly="readonly" v-model=role.created_at>
            </div>

            <div class="control">          
              <label class="label">Updated</label>
              <input class="input " type="text" readonly="readonly" v-model=role.updated_at>
            </div> 
          </div>            

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
      role: null,
      id: null,
      errors: [],
      title: 'Role',
      sign: null,
      baseURL: null,      
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL   
    this.getRole ()
  },
  methods: {
    getRole () {
      this.id = this.$route.params.id
      axios
        .get(this.baseURL + '/roles/' + this.id, { crossdomain: true })
        .then(response => {
          this.role = response.data.data
          this.title = 'Role: ' + this.role.name
        })       
    },
    deleteRole (id) {
      axios
        .delete(this.baseURL + '/roles/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/roles'})
        })
    },
  }
}
</script>
