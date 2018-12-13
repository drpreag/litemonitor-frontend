/* eslint-disable */
<template>
  <div id="role">

      <div v-if="role">

        <div class="row">
          <div class="col-lg-9">
            <h3>{{ title }}</h3>      
          </div>
          <div class="col-lg-3">
            <router-link :to="{ name:'Roles' }">
              <button class="btn btn-sm btn-info">Back</button>
            </router-link>
            &nbsp
            <router-link :to="{ name:'RoleEdit', params: { id: role.id }}">
              <button class="btn btn-sm btn-info">Edit</button>
            </router-link>            
            &nbsp
            <button class="btn btn-sm btn-info" v-on:click="deleteRole(role.id)">
              Delete
            </button>            
          </div>
        </div>  

        <div class="row">
          <div class="col-lg-9">
            <div class="form-group">
              <label class="control-label">Id</label>
              <input class="form-control" type="text" readonly="readonly" v-model=role.id>
            </div>
        
            <div class="form-group">
              <label class="control-label">Name</label>
              <input class="form-control" type="text" readonly="readonly" v-model=role.name>
            </div>
         
            <div class="form-group">
              <label class="control-label">Description</label>
              <input class="form-control" type="text" readonly="readonly" v-model=role.description>
            </div>

            <div class="form-group">
              <label class="control-label">Created</label>
              <input class="form-control" type="text" readonly="readonly" v-model=role.created_at>
            </div>

            <div class="form-group">
              <label class="control-label">Updated</label>
              <input class="form-control" type="text" readonly="readonly" v-model=role.updated_at>
            </div> 
          </div>            

        </div>

        <div v-if="permissions" class="row">
          <div class="col-lg-9">
            <h4>Permissions</h4>
            <table class="table table-bordered table-striped table-condensed">
              <thead>
                <th>Object</th>
                <th class="text-center">Browse</th>
                <th class="text-center">Read</th>
                <th class="text-center">Edit</th>
                <th class="text-center">Add</th>
                <th class="text-center">Delete</th>
              </thead>
              <tbody>          
                <tr v-for="permission in permissions" :key="permissions.id">
                  <td>{{ permission.object }}</td>
                  <td class="text-center">
                    <drawing :sign="permission.b" origin="yesno" size="1"></drawing>
                  </td>
                  <td class="text-center">
                    <drawing :sign="permission.r" origin="yesno" size="1"></drawing>
                  </td>
                  <td class="text-center">
                    <drawing :sign="permission.e" origin="yesno" size="1"></drawing>
                  </td>
                  <td class="text-center">
                    <drawing :sign="permission.a" origin="yesno" size="1"></drawing>
                  </td>
                  <td class="text-center">
                    <drawing :sign="permission.d" origin="yesno" size="1"></drawing>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },
  data () {
    return {
      role: null,
      id: null,
      errors: [],
      permissions: [],
      title: 'Role',
      sign: null,
      baseURL: null,      
    }
  },
  mounted () {
    this.getRole ();
    this.getPermissions();
  },
  methods: {
    getRole () {
      this.id = this.$route.params.id
      this.$http
        .get('/roles/' + this.id)
        .then(response => {
          this.role = response.data.data
          this.title = 'Role: ' + this.role.name
        })       
    },
    getPermissions () {
      this.id = this.$route.params.id
      this.$http
        .get('/roles/' + this.id + '/permissions')
        .then(response => {
          this.permissions = response.data.data
        })       
    },    
    deleteRole (id) {
      this.$http
        .delete('/roles/' + id)
        .then(response => {
          this.$router.push({path:'/roles'})
        })
    },
  }
}
</script>
