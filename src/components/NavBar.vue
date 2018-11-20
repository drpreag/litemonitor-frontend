<template>
  <nav class="navbar navbar-light navbar-expand-sm navbar-light navbar-jw navbar-fixed-top">

    <a class="navbar-brand" href="/">
      <img src="/static/logo.png" width="75" class="d-inline-block align-top" alt="">
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">

    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Hosts')" :to="{ name:'Hosts' }">Hosts</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Services')" :to="{ name:'Services' }">Services</router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :class="activeClass('Users')" :to="{ name:'Users' }">Users</router-link>
              <li><router-link class="dropdown-item" :class="activeClass('Roles')" :to="{ name:'Roles' }">Roles</router-link></li>          
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
          <router-link class="nav-link" :class="activeClass('Login')" :to="{ name:'Login' }" exact>Login</router-link>
          <router-link class="nav-link" :class="activeClass('Register')" :to="{ name:'Register' }" exact>Register</router-link>
        </ul>
    </div>
  </nav>
</template>

<script type="text/javascript">

import Flapping from '@/components/Flappings/Flapping'

export default {
  name: 'NavBar',
  components: { Flapping },
  data () { 
    return {
      lastFlappingId: 0
    }
  },
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name == this.$route.name) {
          return 'link-active'
          alert (name)
        }
      }
    }   
  }  
}
</script>
