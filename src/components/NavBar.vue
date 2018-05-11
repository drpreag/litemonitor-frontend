<template>
  <div id="nav-bar" class="content">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item">
          <router-link :class="activeClass('Dashboard')" :to="{ name:'Dashboard' }" exact>
            <img src="@/assets/logo.png" alt="LiteMonitor" width="75">
          </router-link>
        </a>
      </div>

      <div class="navbar-menu">
      
        <div class="navbar-start">
 
          <router-link class="navbar-item" :class="activeClass('Hosts')" :to="{ name:'Hosts' }">Hosts</router-link>
          <router-link class="navbar-item" :class="activeClass('Services')" :to="{ name:'Services' }">Services</router-link>
          
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">Admin</div>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" :class="activeClass('Users')" :to="{ name:'Users' }" >Users</router-link>
            </div>
          </div>

        </div>
<!--
        <div class="navbar-end">
          <router-link class="navbar-item" :class="activeClass('Dashboard')" :to="{ name:'Dashboard' }" exact>Login</router-link>
          <router-link class="navbar-item" :class="activeClass('Dashboard')" :to="{ name:'Dashboard' }" exact>Register</router-link>
        </div>
-->        
      </div>
    </nav>
    <br/> 
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'NavBar',
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
