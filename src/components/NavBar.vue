<template>

  <nav class="navbar navbar-light navbar-expand-sm navbar-light navbar-jw navbar-fixed-top">

    <a v-if="isAuth" class="navbar-brand" href="/dashboard">
      <img src="/static/logo.png" width="75" class="d-inline-block align-top" alt="">
    </a>
    <a  v-if="!isAuth" class="navbar-brand" href="/home">
      <img src="/static/logo.png" width="75" class="d-inline-block align-top" alt="">
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">

    <ul v-if="isAuth" class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Hosts')" :to="{ name:'Hosts' }">Hosts</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Services')" :to="{ name:'Services' }">Services</router-link>
      </li>
      <div v-if="authUser.user_role_id==9">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" :class="activeClass('Users')" :to="{ name:'Users' }">Users</router-link>
                <li>
                  <router-link class="dropdown-item" :class="activeClass('Roles')" :to="{ name:'Roles' }">Roles</router-link>
                </li>
            <!-- div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a> -->
            </div>
        </li>
      </div>
    </ul>
    <ul v-if="!isAuth" class="navbar-nav ml-auto">
      <router-link class="nav-link" :class="activeClass('Login')" :to="{ name:'Login' }">Login</router-link>
      <router-link class="nav-link" :class="activeClass('Register')" :to="{ name:'Register' }">Register</router-link>
    </ul>
        <ul v-if="isAuth" class="navbar-nav ml-auto">
          <router-link class="nav-link" :class="activeClass('Logout')" :to="{ name:'Logout' }">{{ authUser.user_fullname }} Logout</router-link>
        </ul>

    </div>
  </nav>
</template>

<script type="text/javascript">

export default {
  name: 'NavBar',
  components: { },
  data () { 
    return {
      authUser: {},
      isAuth: true,
      showNavBar: true
    }
  },
  created () {
    var currentRoute = this.$router;
    this.isAuth = this.$auth.isAuthenticated();
    this.$auth.setAuthUser();    
    if (this.isAuth) {
      this.authUser = this.$auth.getAuthUser();
    }
  },
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name == this.$router.name) {
          // alert (name)          
          return 'router-link-active'
        }
        else
          return ''
      }
    },
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: lightgray;
  color: white;
}
</style>
