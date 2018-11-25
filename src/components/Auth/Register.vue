<template>
    <div class="d-flex justify-content-center">
        
            <div class="col-lg-6 col-lg-offset-3">
                <div class="card card-default">
                    <div class="card-header">Register new account</div>
                    <div class="card-body">
                        <form class="form-horizontal" role="form" method="POST" action="https://softwarepieces.com/login">

                            <div class="form-group">
                                <label for="username" class="control-label">Full name</label>
                                <div>
                                    <input id="username" type="email" class="form-control" name="fullname" placeholder="Full name" v-model="fullname" required autofocus>
                                </div>
                                <div v-show="submitted && !fullname" class="invalid-feedback">Full name is required</div>
                            </div>

                            <div class="form-group">
                                <label for="username" class="control-label">E-mail</label>
                                <div>
                                    <input id="username" type="email" class="form-control" name="username" placeholder="E-mail" v-model="username" required autofocus>
                                </div>
                                <div v-show="submitted && !username" class="invalid-feedback">Password is required</div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="control-label">Password</label>
                                <div>
                                    <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Your password">
                                </div>
                                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="control-label">Password</label>
                                <div>
                                    <input id="password" type="password" class="form-control" name="password" required v-model="passwordtwo" placeholder="Your password">
                                </div>
                                <div v-show="submitted && !passwordtwo" class="invalid-feedback">Password is required</div>
                            </div>

                        </form>
                    </div>

                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>

                </div>
            </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            fullname: '',
            username: '',
            password: '',
            passwordtwo: '',
            submitted: false
        }
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (fullname && username && password && (password == passwordtwo)) {
                // this.login({ username, password })
            }
        }
    }
};
</script>