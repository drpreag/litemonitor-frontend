<template>
    <div class="d-flex justify-content-center">
        
        <div class="col-md-8">
            <div class="card card-default">
                <form v-on:submit="handleSubmit">                    
                    <div class="card-header">Register new account</div>
                    <div class="card-body">

                        <div class="form-group">
                            <label for="name" class="control-label">Full name</label>
                            <div>
                                <input id="name" type="text" class="form-control" name="name" placeholder="Full name" v-model="name" required autofocus>
                            </div>
                            <div v-show="submitted && !name" class="invalid-feedback">
                                Full name is required
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email" class="control-label">E-mail</label>
                            <div>
                                <input id="email" type="email" class="form-control" name="email" placeholder="E-mail" v-model="email" required autofocus>
                            </div>
                            <div v-show="submitted && !email" class="invalid-feedback">
                                E-mail (email) is required
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="control-label">Password</label>
                            <div>
                                <input id="password" type="password" class="form-control" name="password" required v-model="password" placeholder="Password">
                            </div>
                            <div v-show="submitted && !password" class="invalid-feedback">
                                Password is required
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="control-label">Repeated password</label>
                            <div>
                                <input id="password" type="password" class="form-control" name="password" required v-model="passwordtwo" placeholder="Repeated password">
                            </div>
                            <div v-show="submitted && !passwordtwo" class="invalid-feedback">
                                Password is required, and must be equal as first password
                            </div>
                        </div>

                    </div>
                    
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            name: '',
            email: '',
            password: '',
            passwordtwo: '',
            submitted: false
        }
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            // if (this.password != this.passwordtwo)
            //     return false;
            // if (! (this.name && this.email && this.password) ) {
            //     return false;
            
            var data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$http
                .post('register', data)
                .then(response => {
                    this.$router.push({ name: 'Login'})
                })
                .catch(error => {
                    console.log(error)
                });
            e.preventDefault();
        }
    }
}
</script>