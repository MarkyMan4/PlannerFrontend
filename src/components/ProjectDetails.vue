<template>
  <div v-if="projDetail != null">
        <h3>{{ projDetail.name }}</h3>
        <div v-if="!this.editing">
          <hr>
          <h5><b>Description</b></h5>
          <p>{{ projDetail.description }}</p>
          <h5><b>Start Date</b></h5>
          <p>{{ projDetail.start_date }}</p>
          <h5><b>End Date</b></h5>
          <p>{{ projDetail.end_date }}</p>
          <h5><b>People Working On This</b></h5>
          <ul>
            <li v-for="person in peopleOnProj" :key="person.user">
                {{ person.user }} - {{ person.percent_allocated }}%
            </li>
          </ul>
          <br>
          <div class="row text-center mb-5">
            <button v-if="projDetail.active == true" v-on:click="editMode()" class="btn btn-outline-success shadow ml-3 mr-2">Edit</button>
            <button v-if="projDetail.active == true" v-on:click="deactivateProject(projDetail)" class="btn btn-outline-danger shadow">Deactivate</button>
          </div>
        </div>
      <div v-else>
        <ProjectForm v-bind:projData="projDetail" v-bind:editing="true" @refreshData="refreshData()"/>
        <button v-on:click="viewMode()" class="btn btn-outline-danger ml-3 mt-3 mb-5 shadow">Cancel</button>
      </div>
  </div>
  <div v-else>
      <h3>Select a project</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ProjectForm from '@/components/ProjectForm.vue';

export default {
  name: 'ProjectDetials',
  components: {
    ProjectForm
  },
  props: {
      projDetail: {},
      peopleOnProj: {
          type: Array
      }
  },
  data() {
    return {
        token: localStorage.getItem('user-token'),
        editing: false
    }
  },
  methods: {
      deactivateProject(projDetail) {
          var baseUrl = "https://planner-backend-api.herokuapp.com/";

          if(window.location.hostname == "localhost") {
            baseUrl = "http://localhost:8000/";
          }

          const headers = {
            'Authorization': 'Token ' + this.token
          }

          axios.post(baseUrl + "api/projects/" + this.projDetail.id + "/deactivate/", {}, {
              headers: headers
          })
          .then(res => {
              window.location.reload(true);
          })
          .catch(err => console.log(err));

        //   axios.de
      },
      editMode() {
        this.editing = true;
      },
      viewMode() {
        this.editing = false;
      },
      refreshData() {
        this.$emit('refreshData');
      }
  },
}
</script>
