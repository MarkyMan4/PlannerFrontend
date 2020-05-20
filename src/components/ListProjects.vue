<template>
  <div>
    <div class="text-center">
      <h1 class="mb-3">Projects</h1>
      <toggle-button @change="getProjects()"
                     :value="true"
                     :labels="{checked: 'Active', unchecked: 'Inactive'}"
                     :width="100"
                     :font-size="18"/>
      <hr>
    </div>
    <div class="row mt-5 ml-5 text-left">
      <div class="col-md-5 ml-5">
        <div id="projCard" v-on:click="projectDetails(proj)" class="shadow rounded mb-2" v-for="proj in projects" :key="proj.id">
          <h4>
            {{ proj.name }}
          </h4>
        </div>
      </div>
      <div class="col-md ml-5">
        <ProjectDetails v-bind:projDetail="projDetail" v-bind:peopleOnProj="peopleOnProj"/>
      </div>
    </div>
  </div>
</template>

<style>
  #projCard {
    padding: 15px;
    background-color: #ffffff;
  }

  #projCard:hover {
    background-color: #5a5a5a;
    color: #ffffff;
    cursor: pointer;
  }
</style>

<script>
// @ is an alias to /src
import axios from 'axios';
import ProjectDetails from './ProjectDetails.vue';

export default {
  name: 'ListProjects',
  components: {
    ProjectDetails
  },
  data() {
    return {
      projects : [],
      projDetail: null,
      peopleOnProj: null,
      token: localStorage.getItem('user-token'),
      viewingActive: true
    }
  },
  methods: {
    getProjects() {
      var baseUrl = "https://planner-backend-api.herokuapp.com/";

      if(window.location.hostname == "localhost") {
        baseUrl = "http://localhost:8000/";
      }

      var active_param = String(this.viewingActive);
      
      axios.get(baseUrl + "api/projects/", {
        params: {
          active: active_param
        },
        headers: {
          'Authorization': 'Token ' + this.token
        }
      })
      .then(res => {
        this.projects = res.data;
        this.viewingActive = !this.viewingActive;
        this.projDetail = null
      })
      .catch(err => console.log(err));
    },
    projectDetails(proj) {
      var baseUrl = "https://planner-backend-api.herokuapp.com/";

      if(window.location.hostname == "localhost") {
        baseUrl = "http://localhost:8000/";
      }

      this.projDetail = proj;

      axios.get(baseUrl + "api/people-on-projects/", {
        params: {
          proj_id: proj.id
        },
        headers: {
          'Authorization': 'Token ' + this.token
        }
      })
      .then(res => {
        this.peopleOnProj = res.data;
      })
      .catch(err => console.log(err));
    }
  },
  created() {
    this.getProjects();
  }
}
</script>
