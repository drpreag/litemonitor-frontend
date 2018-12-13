<template>
    <div>
        <div class="text-center">
          <img src="static/images/errors/error_500.png" alt="Error 500"/>
        </div>
        <div class="text-center">
            <p>Server error</p>
        </div>
        <div class="text-center">
            <a href="mailto:litemonitor@softwarepieces.com">Send us email to litemonitor@softwarepieces.com</a>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },     
    methods: {

        handleSubmit (e) {
            let data = {};
            if (this.username && this.password)
                data = { username: this.username, password: this.password }               
            else 
                return false;

            this.$http
                .post('login', data)
                .then(response => {
                    this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
                    this.$auth.setAuthenticatedUser(data);
                    this.$eventHub.$emit('logged_in', 'User logged in');
                    this.$router.push({ name: 'Dashboard'});                    
                })
                .catch(error => {
                    console.log(error);
                });

            e.preventDefault();
        }
    }
};
</script>