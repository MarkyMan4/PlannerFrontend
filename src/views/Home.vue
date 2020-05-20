<template>
  <div class="home page">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div v-if="token!=null">
      <ListProjects/>
    </div>
    <div v-else-if="token==null">
      <h3>Please login to view projects</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListProjects from '@/components/ListProjects.vue'

export default {
  name: 'Home',
  components: {
    ListProjects
  },
  data() {
    return {
      token: localStorage.getItem('user-token')
    }
  },
}
</script>
