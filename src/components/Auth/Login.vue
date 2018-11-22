<template>
    <div class="d-flex justify-content-center">
        
            <div class="col-lg-8 col-lg-offset-2">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form v-on:submit="handleSubmit">
                            <div class="form-group">
                                <label for="username" class="col-lg-4 control-label">Username</label>
                                <div class="col-lg-6">
                                    <input id="username" type="email" class="form-control" name="username" placeholder="Username" v-model="username" required autofocus>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-lg-4 control-label">Password</label>
                                <div class="col-lg-6">
                                    <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Your password">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-6">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button><br>
                                    <p>
                                        <router-link to="/forgot">Forgot your password?</router-link><br>
                                        <router-link to="/register">Do not have account yet?</router-link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        
    </div>
</template>

<script>
import axios from 'axios';
// import Auth from '../../../packages/auth/Auth.js';

export default {
    data () {
        return {
            username: '',
            password: '',
            baseURL: null
        }
    },
    mounted () {
        this.baseURL = process.env.API_BASE_URL
    },     
    methods: {
        handleSubmit (e) {
            if (this.username && this.password) {
                var data = {
                    username: this.username,
                    password: this.password
                }
                axios
                     .post(this.baseURL+'/login', data, { crossdomain: true })
                    .then(response => {
                        this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
                        this.$router.push({path:'/'})
                    })
                    e.preventDefault()                
            }
        }
    }
};
</script>