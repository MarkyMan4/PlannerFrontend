<template>
  <div class="page" v-if="token != null">
        <h1>Enter New Project</h1>
        <div class="row">
            <div class="col-md"></div>
            <div class="col-md">
                <ProjectForm/>
            </div>
            <div class="col-md"></div>
        </div>
  </div>
  <div v-else-if="token == null">
    <h3>Please login to enter a project</h3>
  </div>
</template>

<script>

import ProjectForm from '@/components/ProjectForm.vue';
import axios from 'axios';

export default {
    name: 'EnterProject',
    components: {
        ProjectForm
    },
    data() {
        return {
            name: null,
            desc: null,
            start: null,
            end: null,
            token: localStorage.getItem('user-token')
        }
    },
    methods: {
    checkForm() {
      var baseUrl = "https://planner-backend-api.herokuapp.com/";

      if(window.location.hostname == "localhost") {
        baseUrl = "http://localhost:8000/";
      }

      const headers = {
          'Authorization': 'Token ' + this.token
      }
      axios.post(baseUrl + 'api/projects/', {
          name: this.name,
          description: this.desc,
          start_date: this.start,
          end_date: this.end
      },
      {
          headers: headers
      })
      .then(res => {
          this.name = '';
          this.desc = '';
          this.start = null;
          this.end = null;
      })
      .catch(res => (console.log(res)));
    }
  },
}
</script>
