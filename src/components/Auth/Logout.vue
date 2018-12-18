<template>
    <div></div>
</template>

<script>

export default {
    mounted () {
		this.$http
            .post('logout')
            .then(response => {
                this.$auth.destroyToken()
                this.$auth.setAuthenticatedUser(null)
                this.$router.push({path:'/'})        
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_email')
                localStorage.removeItem('user_name')
                localStorage.removeItem('user_role_id')
                this.$eventHub.$emit('logged_out', 'User logged out')
            })
            .catch(error => {
                console.log(error)
            })

    }
};
</script>