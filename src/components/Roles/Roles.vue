/* eslint-disable */
<template>
  <div id="roles" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'RoleCreate' }">
          <button class="button is-primary is-small is-rounded">Add new Role</button>
        </router-link>
      </div>
    </div>
  
    <div v-if="roles">
      <table class="table is-bordered is-striped is-fullwidth is-hoverable">
        <thead>
          <th class="has-text-right">Id</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </thead>
        <tbody>          
          <tr v-for="role in roles" :key="role.id">
            <td class="has-text-right">{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td>
              <router-link :to="{ name: 'Role', params: { id: role.id }}">
                <button type="button" class="button is-light is-small is-rounded">View</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
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
      roles: [],
      errors: [],
      title: 'Roles',
      sign: null,
      baseURL: null,
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL     
    this.getRoles()
  },
  methods: {
    getRoles () {
      axios
        .get(this.baseURL+'/roles', { crossdomain: true })
        .then(response => {
          this.roles = response.data.data
        })
    }
  }
}
</script>
