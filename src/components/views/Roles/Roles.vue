/* eslint-disable */
<template>
  <div id="roles">

    <div class="row">
      <div class="col-lg-10">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-2 text-center">
        <router-link :to="{ name:'RoleCreate' }">
          <button class="btn btn-sm btn-info">Add new Role</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="roles">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
          <th class="text-right">Id</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </thead>
        <tbody>          
          <tr v-for="role in roles" :key="role.id">
            <td class="text-right">{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td  class="text-center">
              <router-link :to="{ name: 'Role', params: { id: role.id }}">
                <button class="btn btn-xs btn-info">View</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Drawing from '@/components/common/Drawing'

export default {
  components: { Drawing },  
  data () {
    return {
      roles: [],
      errors: [],
      title: 'Roles',
      sign: null,
      baseURL: null,
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    getRoles () {
      this.$http
        .get('/roles')
        .then(response => {
          this.roles = response.data.data
        })
    }
  }
}
</script>
