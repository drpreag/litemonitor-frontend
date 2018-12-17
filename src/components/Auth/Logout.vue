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
                localStorage.removeItem('userId')
                localStorage.removeItem('userEmail')
                localStorage.removeItem('userName')
                localStorage.removeItem('userRoleId')
                this.$eventHub.$emit('logged_out', 'User logged out')
            })
            .catch(error => {
                console.log(error)
            })

    }
};
</script>