<template>
    <div class="d-flex justify-content-center">
        
        <div class="col-md-8">
            <div class="card card-default">
                <form v-on:submit="handleSubmit">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                    
                        <div class="form-group">
                            <label for="username" class="control-label">Username (e-mail)</label>
                            <input id="username" type="email" class="form-control" name="username" placeholder="Username" v-model="username" required autofocus>
                        </div>

                        <div class="form-group">
                            <label for="password" class="control-label">Password</label>
                            <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Your password">
                        </div>

                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary">Login</button><br>
                        <div class="row">
                            <div class="col-md-6"><router-link to="/forgot">Forgot your password?</router-link></div>
                            <div class="col-md-6"><router-link to="/register">Do not have account yet?</router-link></div>
                        </div>
                    </div>
                </form>                
            </div>
        </div>
        
    </div>
</template>

<script>

import Vue from 'vue'
import unauthHttp from "../../../modules/Axios"

export default {
    data () {
        return {
            username: '',
            password: '',
            isAuth: false,
            authUser: {}
        }
    },     
    methods: {
        handleSubmit (e) {
            let data = {}
            let userObject = {}
            if (this.username && this.password)
                data = { username: this.username, password: this.password }               
            else 
                return false;

            unauthHttp
                .post('login', data)
                .then(response => {
                    Vue.auth.setToken(response.data.access_token, response.data.expires_in + Date.now())
                    Vue.auth.setAuthenticatedUser(data)

                    Vue.auth.getUser()

                    this.isAuth = true
                    this.authUser.id = localStorage.getItem('userId');
                    this.authUser.email = localStorage.getItem('userEmail');
                    this.authUser.name = localStorage.getItem('userName');
                    this.authUser.role_id = localStorage.getItem('userRoleId');

                    this.$eventHub.$emit('logged_in', 'User logged in')
                    this.$router.push({ name: 'Dashboard'})
                })
                .catch(error => {
                    console.log(error);
                });
            e.preventDefault();
        }
    }
};
</script>