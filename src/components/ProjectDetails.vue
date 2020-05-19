<template>
  <div v-if="projDetail != null">
      <h3>{{ projDetail.name }}</h3>
      <hr>
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
      <button v-if="projDetail.active == true" v-on:click="deactivateProject(projDetail)" class="btn btn-danger">Deactivate</button>
  </div>
  <div v-else>
      <h3>Select a project</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'ProjectDetials',
  components: {
    
  },
  props: {
      projDetail: {},
      peopleOnProj: {
          type: Array
      }
  },
  data() {
    return {
        token: localStorage.getItem('user-token')
    }
  },
  methods: {
      deactivateProject(projDetail) {
          const headers = {
            'Authorization': 'Token ' + this.token
          }

          axios.post("https://planner-backend-api.herokuapp.com/api/projects/" + this.projDetail.id + "/deactivate/", {}, {
              headers: headers
          })
          .then(res => {
              window.location.reload(true);
          })
          .catch(err => console.log(err));

        //   axios.de
      }
  },
}
</script>
