<template>
  <div id="app">
    <Header/>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/enterproject">Enter Project</router-link> |
      <router-link to="/entertime">Enter Time On Project</router-link> -->
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: '',
  components: {
    Header
  }
}
</script>

<style>

html {
  background-color: #F3F3F3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #F3F3F3;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.page {
  width: inherit;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
}
</style>
