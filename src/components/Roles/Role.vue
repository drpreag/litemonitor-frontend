/* eslint-disable */
<template>
  <div id="role" class="content">

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

      <div v-if="role" class="box">

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
              <label class="label">Active</label>
                <drawing :sign="role.active" origin="yesno"></drawing>
            </div>

            <div class="control">          
              <label class="label">Creator</label>
              <input class="input" type="text" readonly="readonly" v-model=role.creator_name>
            </div>

            <div class="control">          
              <label class="label">Created</label>
              <input class="input" type="text" readonly="readonly" v-model=role.created_at.date>
            </div>

            <div class="control">          
              <label class="label">Updated</label>
              <input class="input " type="text" readonly="readonly" v-model=role.updated_at.date>
            </div> 
          </div>

          <div class="column is-one-quarters" align="right">
            <div class="control has-text-right">
              <router-link :to="{ name:'RoleEdit', params: { id: role.id }}">
                <button class="button is-warning is-small is-rounded">Edit</button>
              </router-link>
            </div>
            <div>&nbsp</div>          
            <div class="control has-text-right" >
              <div class="control has-text-right" >
                <button class="button is-danger is-small is-rounded" v-on:click="deleteRole(role.id)">
                  Delete
                </button>
              </div>
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
      role: null,
      id: null,
      errors: [],
      title: 'Role',
      sign: null
    }
  },
  created () {
    this.getRole()
  },
  mounted () {
    this.getRole()
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
        .catch(e => {
          this.errors.push(e)
        })        
    },
    deleteRole (id) {
      axios
        .delete('http://localhost:8000/api/role/' + id, { crossdomain: true })
        .then(response => {
          this.$router.push({path:'/roles'})
        })
    },
  }
}
</script>
