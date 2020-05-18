<template>
  <div>
    <div class="text-center">
      <h1>Active Projects</h1>
      <hr>
    </div>
    <div class="row mt-5 ml-5 text-left">
      <div class="col-md-5 ml-5">
        <div class="card" v-for="proj in projects" :key="proj.id">
          <button class="btn btn-block btn-outline-secondary text-left" v-on:click="projectDetails(proj)">
            <h4>
              {{ proj.name }}
            </h4>
          </button>
        </div>
      </div>
      <div class="col-md ml-5">
        <ProjectDetails v-bind:projDetail="projDetail" v-bind:peopleOnProj="peopleOnProj"/>
      </div>
    </div>
  </div>
</template>

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
      token: localStorage.getItem('user-token')
    }
  },
  methods: {
    getProjects() {
      axios.get("http://localhost:8000/api/projects/", {
        params: {
          active: "true"
        },
        headers: {
          'Authorization': 'Token ' + this.token
        }
      })
      .then(res => {
        this.projects = res.data;
      })
      .catch(err => console.log(err));
    },
    projectDetails(proj) {
      this.projDetail = proj;

      axios.get("http://localhost:8000/api/people-on-projects/", {
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
