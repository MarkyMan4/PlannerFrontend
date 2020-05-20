<template>
  <div class="page" v-if="token!=null">
    <h1 class="text-center">All Projects Timeline</h1>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <timeline :data="graphData"></timeline>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
  <div v-else-if="token==null">
    <h3>Please login to view dashboard</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Dashboard',
    components: {

    },
    data() {
        return {
            token: localStorage.getItem('user-token'),
            graphData: [],
            projects: []
        }
    },
    methods: {
      getProjects() {
      var baseUrl = "https://planner-backend-api.herokuapp.com/";

      if(window.location.hostname == "localhost") {
        baseUrl = "http://localhost:8000/";
      }

        axios.get(baseUrl + "api/projects/", {
          headers: {
            'Authorization': 'Token ' + this.token
          }
        })
        .then(res => {
          this.projects = res.data;
          // console.log(this.projects);

          for(var i = 0; i < this.projects.length; i++) {
            this.graphData.push([this.projects[i].name, this.projects[i].start_date, this.projects[i].end_date]);
            // console.log(this.graphData);
          }
        })
        .catch(err => console.log(err));
      }
    },
    created() {
      this.getProjects();
    }
}
</script>
