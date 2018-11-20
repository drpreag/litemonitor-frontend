<template>
    <div class="d-flex justify-content-center">
        
            <div class="col-lg-8 col-lg-offset-2">
                <div class="card card-default">
                    <div class="card-header">Register new account</div>
                    <div class="card-body">
                        <form class="form-horizontal" role="form" method="POST" action="https://softwarepieces.com/login">

                            <div class="form-group">
                                <label for="username" class="col-lg-4 control-label">Full name</label>
                                <div class="col-lg-6">
                                    <input id="username" type="email" class="form-control" name="fullname" placeholder="Full name" v-model="fullname" required autofocus>
                                </div>
                                <div v-show="submitted && !fullname" class="invalid-feedback">Full name is required</div>
                            </div>

                            <div class="form-group">
                                <label for="username" class="col-lg-4 control-label">E-mail</label>
                                <div class="col-lg-6">
                                    <input id="username" type="email" class="form-control" name="username" placeholder="E-mail" v-model="username" required autofocus>
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
                                <label for="password" class="col-lg-4 control-label">Password</label>
                                <div class="col-lg-6">
                                    <input id="password" type="password" class="form-control" name="password" required v-model="passwordtwo" placeholder="Your password">
                                </div>
                                <div v-show="submitted && !passwordtwo" class="invalid-feedback">Password is required</div>
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