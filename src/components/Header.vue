<template>
    <div class="navbar-custom shadow">
        <nav class="nav">
            <router-link class="btn btn-square btn-outline-success navbar-text" to="/">Home</router-link>
            <router-link class="btn btn-square btn-outline-success navbar-text" to="/dashboard">Dashboard</router-link>
            <router-link class="btn btn-square btn-outline-success navbar-text" to="/enterproject">Enter Project</router-link>
            <router-link class="btn btn-square btn-outline-success navbar-text" to="/entertime">Enter Time On Project</router-link>
            <router-link class="btn btn-square btn-outline-success navbar-text" v-if="token==null" to="/login">Login</router-link>
            <form v-if="token!=null" id="logoutForm" @submit="logout">
                <input class="btn btn-square btn-outline-success navbar-text" type="submit" value="Logout">
            </form>
        </nav>
    </div>
</template>

<style> 
    /* Modify the background color */ 
        
    .navbar-custom { 
        background-color: rgb(255, 255, 255); 
    } 
    /* Modify brand and text color */ 
        
    .navbar-custom .navbar-brand, 
    .navbar-custom .navbar-text { 
        color: rgb(0, 0, 0); 
        padding: 15px;
        font-size: 14pt;
    } 
    .btn.btn-square {
       border-radius: 0;
       border: 0px;
    }
</style>

<script>
import axios from 'axios';

export default {
    name: 'Header',
    components: {

    },
    data() {
        return {
            token: localStorage.getItem('user-token')
        }
    },
    methods: {
        logout() {
            console.log('logged out');
            localStorage.removeItem('user-token');
            window.location.reload(true);
        }
    }
}
</script>
