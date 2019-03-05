<template>

  <nav class="navbar navbar-light navbar-expand-sm navbar-light navbar-jw fixed-top">

    <a class="navbar-brand" href="/">
      <img src="/static/icons-32.png" width="32px" class="d-inline-block align-top" alt="LiteMonitor">LiteMonitor
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">

    <ul v-if="isAuth" class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Statistics')" :to="{ name:'Statistics' }">Statistics</router-link>
      </li>       
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Dashboard')" :to="{ name:'Dashboard' }">Dashboard</router-link>
      </li>      
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Hosts')" :to="{ name:'Hosts' }">Hosts</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="activeClass('Services')" :to="{ name:'Services' }">Services</router-link>
      </li>
      <div v-if="authUser.role_id>=this.$constants.USER_ROLE_MODERATOR">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="nav-link" :class="activeClass('Users')" :to="{ name:'Users' }">Users</router-link>
                <li>
                  <router-link class="nav-link" :class="activeClass('Roles')" :to="{ name:'Roles' }">Roles</router-link>
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
          <router-link class="nav-link" :class="activeClass('Logout')" :to="{ name:'Logout' }">{{ authUser.name }} Logout</router-link>
        </ul>

    </div>
  </nav>
</template>

<script type="text/javascript">

export default {
  name: 'NavBar',
  data () { 
    return {
      authUser: {},
      isAuth: false,
      showNavBar: true
    }
  },
  created () {
    this.$eventHub.$on('logged_in', (message) => {
      this.isAuth=true;
      this.getAuthUser()
      console.log (message)
    }); 

    this.$eventHub.$on('logged_out', (message) => {
      this.isAuth=false
      this.authUser=null
      console.log (message)
    });    

    this.isAuth = this.$auth.isAuthenticated()
    if (this.isAuth) {
      this.getAuthUser()
      console.log ("User data exists on local storage.")
    } else {
      console.log ("User data does NOT exist on local storage.")
    }
  },
  watch: {
    '$route' () {
      $('#navbarNav').collapse('hide')
    },    
    isAuth: function (value) {
      if (value==true) {
        this.getAuthUser()
      }
    }   
  },
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name == this.$router.name)      
          return 'router-link-active'
        else
          return 'active'
      }
    },
    getAuthUser() {
      this.$auth.getUser()
      this.authUser.id = localStorage.getItem('user_id')
      this.authUser.email = localStorage.getItem('user_email')
      this.authUser.name = localStorage.getItem('user_name')
      this.authUser.role_id = localStorage.getItem('user_role_id')     
    }
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: lightgray;
  color: white;
}
</style>
