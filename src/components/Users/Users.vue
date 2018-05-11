/* eslint-disable */
<template>
  <div id="users" class="content">

    <div class="columns">
      <div class="column is-three-quarters">
        <h3>{{ title }}</h3>      
      </div>
      <div class="column is-one-quarters add-new-resource">
        <router-link :to="{ name:'UserCreate' }">
          <button class="button is-primary is-small is-rounded">Add new User</button>
        </router-link>
      </div>
    </div>

    <div v-if="users">
      <table class="table is-bordered is-striped is-fullwidth is-hoverable">
        <thead>
          <th class="has-text-right">Id</th>
          <th>Name</th>
          <th>Email</th>
          <th class="has-text-centered">Active</th>
          <th>Role</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="has-text-right">{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="has-text-centered">
              <drawing :sign="user.active" origin="yesno"></drawing>
            </td>
            <td>{{ user.role_name }}</td>
            <td>
              <router-link :to="{ name: 'User', params: { id: user.id }}">
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
      users: [],
      errors: [],
      title: 'Users',
      sign: null
    }
  },
  mounted () {
    this.baseURL = process.env.API_BASE_URL  
    this.getUsers ()
  },
  methods: {
    getUsers () {
      axios
        .get(this.baseURL+'/users', { crossdomain: true })
        .then(response => {
          this.users = response.data.data
        })
    }
  }
}
</script>
