<template>
  <div v-if="projDetail != null">
        <h2>{{ projDetail.name }}</h2>
        <div v-if="!this.editing">
          <hr>
          <h3><b>Description</b></h3>
          <p>{{ projDetail.description }}</p>
          <h3><b>Start Date</b></h3>
          <p>{{ projDetail.start_date }}</p>
          <h3><b>End Date</b></h3>
          <p>{{ projDetail.end_date }}</p>
          <h3><b>People Working On This</b></h3>
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

<style>

  .btn.btn-outline-success {
    background: #ffffff;
    border-color: #5cb85c;
  }

  .btn.btn-outline-success:hover {
    background: #5cb85c;
  }

  .btn.btn-outline-danger {
    background: #ffffff;
    border-color: #d9534f;
  }

  .btn.btn-outline-danger:hover {
    background: #d9534f;
  }

  p {
    font-size: 16px;
  }

</style>

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
