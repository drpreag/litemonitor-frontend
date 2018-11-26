<template>
    <div class="d-flex justify-content-center">
        
        <div class="col-lg-6 col-lg-offset-3">
            <div class="card card-default">
                <form v-on:submit="handleSubmit">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                    
                        <div class="form-group">
                            <label for="username" class="control-label">Username (e-mail)</label>
                            <div class="col-lg-8">
                                <input id="username" type="email" class="form-control" name="username" placeholder="Username" v-model="username" required autofocus>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="control-label">Password</label>
                            <div class="col-lg-8">
                                <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Your password">
                            </div>
                        </div>

                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary">Login</button><br>
                        <div class="row">
                            <div class="col-lg-6"><router-link to="/forgot">Forgot your password?</router-link></div>
                            <div class="col-lg-6"><router-link to="/register">Do not have account yet?</router-link></div>
                        </div>
                    </div>
                </form>                
            </div>
        </div>
        
    </div>
</template>

<script>

// import Vue from 'vue'

export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },     
    methods: {
        handleSubmit (e) {
            
            if (this.username && this.password) {
                var data = {
                    username: this.username,
                    password: this.password
                }               
                this.$http
                    .post('login', data)
                    .then(response => {
                        this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
                        this.$auth.setAuthenticatedUser(data);
                        this.$auth.setAuthUser();                         
                        this.$router.push({ name: 'Dashboard'})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            e.preventDefault();
        }
    }
};
</script>