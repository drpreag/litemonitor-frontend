<template>
    <div class="d-flex justify-content-center">
        
            <div class="col-lg-8 col-lg-offset-2">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form class="form-horizontal" role="form" method="POST" action="https://softwarepieces.com/login">
                            <div class="form-group">
                                <label for="username" class="col-lg-4 control-label">Username</label>
                                <div class="col-lg-6">
                                    <input id="username" type="email" class="form-control" name="username" placeholder="Username" v-model="username" required autofocus>
                                </div>
                                <div v-show="submitted && !username" class="invalid-feedback">Password is required</div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-lg-4 control-label">Password</label>
                                <div class="col-lg-6">
                                    <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Your password">
                                </div>
                                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
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
export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    methods: {

        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                // this.login({ username, password })
            }
        }
    }
};
</script>