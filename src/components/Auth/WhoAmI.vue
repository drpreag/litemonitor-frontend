<template>
    <div class="d-flex justify-content-center">
        
        {{ authUser.id }}<br>
        {{ authUser.name }}<br>
        {{ authUser.email }}<br>
        {{ authUser.role_id }}<br>
        
    </div>
</template>

<script>

import Vue from 'vue'
import unauthHttp from "../../../modules/Axios"

export default {
    data () {
        return {
            authUser: {}
        }
    },     
    created () {
        Vue.auth.getUser()
    
        this.authUser.id = localStorage.getItem('userId');
        this.authUser.email = localStorage.getItem('userEmail');
        this.authUser.name = localStorage.getItem('userName');
        this.authUser.role_id = localStorage.getItem('userRoleId');
    }
};
</script>