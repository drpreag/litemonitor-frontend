/* eslint-disable */
<template>
  <div id="users">

    <div class="row">
      <div class="col-lg-10">
        <h3>{{ title }}</h3>      
      </div>
      <div class="col-lg-2 text-right">
        <router-link :to="{ name:'UserCreate' }">
          <button class="btn btn-sm btn-info">Add new User</button>
        </router-link>
      </div>
    </div>

    <div v-if="users">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
          <th class="text-right">Id</th>
          <th>Name</th>
          <th>Email</th>
          <th class="text-center">Active</th>
          <th>Role</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="text-right">{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="text-center">
              <drawing :sign="user.active" origin="yesno"></drawing>
            </td>
            <td>{{ user.role_name }}</td>
            <td class="text-center">
              <router-link :to="{ name: 'User', params: { id: user.id }}">
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
      users: [],
      errors: [],
      title: 'Users',
      sign: null
    }
  },
  mounted () {
    this.getUsers ()
  },
  created () {
    this.getUsers ()
  },
  methods: {
    getUsers () {
      this.$http
        .get('/users')
        .then(response => {
          this.users = response.data.data
        })
        .catch(error => {
          this.errors = error;
        });
    }
  }
}
</script>
