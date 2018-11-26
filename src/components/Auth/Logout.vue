<template>
    <div></div>
</template>

<script>

export default {
    mounted () {
		this.$http
            .post('logout')
            .then(response => {
                console.log (response.body);
            })
            .catch(error => {
                console.log(error)
            })
        this.$auth.destroyToken();
        this.$router.push({path:'/'})
    }
};
</script>