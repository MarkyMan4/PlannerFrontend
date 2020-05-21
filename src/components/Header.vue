<template>
    <div class="">
        <nav class="navbar-custom navbar-expand-lg bg-dark navbar-dark shadow mb-0 text-left">
            <button class="navbar-toggler m-3" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarToggle" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggle">
                <router-link class="btn btn-square btn-outline-secondary navbar-text" to="/">Home</router-link>
                <router-link class="btn btn-square btn-outline-secondary navbar-text" to="/dashboard">Dashboard</router-link>
                <router-link class="btn btn-square btn-outline-secondary navbar-text" to="/enterproject">Enter Project</router-link>
                <router-link class="btn btn-square btn-outline-secondary navbar-text" to="/entertime">Enter Time On Project</router-link>
                <router-link class="btn btn-square btn-outline-secondary navbar-text" v-if="token==null" to="/login">Login</router-link>
                <form v-if="token!=null" id="logoutForm" @submit="logout">
                    <input class="btn btn-square btn-outline-secondary navbar-text" type="submit" value="Logout">
                </form>
            </div>
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
        font-size: 12pt;
    } 
    .btn.btn-square {
       color: rgb(224, 224, 224) !important;
       border-radius: 0;
       border: 0px;
       margin: 0px;
    }

    .btn.btn-square:hover {
        background-color: rgb(165, 165, 165);
        color:rgb(0, 0, 0) !important;
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
