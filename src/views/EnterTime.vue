<template>
  <div class="page" v-if="token!=null">
    <h1>Enter Time On Project</h1>
    <div class="row">
        <div class="col-md"></div>
        <div class="col-md">
            <div class="card mt-5">
                <div class="card-body">
                    <form id="timeForm" @submit.prevent="checkForm">
                      <div class="text-left">
                        <p>
                          <label class="mb-0" for="name"><b>Project</b></label>
                        </p>
                        <p class="mb-4">
                          <select required name="project" id="project" v-model="projId">
                            <option v-for="proj in projects" :key="proj.id" :value="proj.id">
                              {{ proj.name }}
                            </option>
                          </select>
                        </p>
                        <p>
                          <label class="mb-0" for="percent"><b>Percent of Time</b></label>
                        </p>
                        <p>
                          <input required type="number" id="percent" v-model="percent" placeholder="percent of time">
                        </p>
                      </div>
                        <p>
                          <input class="btn btn-outline-success mt-4" type="submit" value="Submit">
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md"></div>
    </div>
  </div>
  <div v-else-if="token==null">
      <h3>Please login to enter time on a project</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnterTime',
  components: {

  },
  data() {
      return {
          token: localStorage.getItem('user-token'),
          projects : [],
          projId: null,
          percent: null
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
      axios.post(baseUrl + 'api/projects/' + this.projId + '/allocate_time/', {
          project: this.projId,
          percent_allocated: this.percent
      },
      {
          headers: headers
      })
      .then(res => {
        this.projId = null;
        this.percent = null;
      })
      .catch(res => (console.log(res)));
    },
    getProjects() {
      var baseUrl = "https://planner-backend-api.herokuapp.com/";

      if(window.location.hostname == "localhost") {
        baseUrl = "http://localhost:8000/";
      }

      axios.get(baseUrl + "api/projects/", {
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
    }
  },
  created() {
    this.getProjects();
  }
}
</script>