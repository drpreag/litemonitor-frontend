<template>

  <nav class="navbar navbar-light navbar-expand-sm navbar-light navbar-jw navbar-fixed-top">

    <a class="navbar-brand" href="/home">
      <img src="/static/logo.png" width="75" class="d-inline-block align-top" alt="">
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">

    <ul v-if="isAuth" class="navbar-nav mr-auto">
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
  components: { },
  
  data () { 
    return {
      authUser: {
        id: null,
        email: null,
        name: null,
        role_id: null
      },
      isAuth: false,
      showNavBar: true
    }
  },
  created () {

    this.$eventHub.$on('logged_in', (message) => {
      this.isAuth=true;
      this.$auth.getUser().then(userObject=>{this.authUser = userObject});
      console.log (message);            
    }); 

    this.$eventHub.$on('logged_out', (message) => {
      this.isAuth=false;
      this.authUser={
        id: null,
        email: null,
        name: null,
        role_id: null
      };
      console.log (message);
    });    

    // var currentRoute = this.$router;
    this.isAuth = this.$auth.isAuthenticated();
    if (this.isAuth) {
      this.$auth.getUser().then(userObject=>{this.authUser = userObject});      
    }

  },
  watch: {
    isAuth: function (value) {
      if (value==true)
        this.$auth.getUser().then(userObject=>{this.authUser = userObject});         
        console.log ("isAuth changed");
    },
    authUser: function () {
        console.log ("authUser changed");
    }    
  },
  methods: {
    activeClass: function (...names) {
      for (let name of names) {
        if (name == this.$router.name)      
          return 'router-link-active';
        else
          return 'active';
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
