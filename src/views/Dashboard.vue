<template>
  <div class="page" v-if="token != null">
    <h1 class="text-center mb-3">All Projects Timeline</h1>
    <div class="row mb-5">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <timeline :data="timelineData"></timeline>
      </div>
      <div class="col-md-1"></div>
    </div>
    <hr>
    <h1 class="text-center mt-5 mb-3">Current Time On Projects</h1>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <column-chart :data="peopleOnProjects" :stacked="true"></column-chart>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
  <div v-else-if="token == null">
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
            timelineData: [],
            projects: [],
            peopleOnProjects: [],
            data: [
              {name: "project1", data: {"user1": 30, "user2": 40}},
              {name: "project2", data: {"user1": 15, "user4": 8}},
              {name: "project3", data: {"user4": 3}},
              {name: "project4", data: {"user3": 1}}
            ]
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
            this.timelineData.push([this.projects[i].name, this.projects[i].start_date, this.projects[i].end_date]);
            // console.log(this.timelineData);
          }

          this.getColumnData(this.projects);
        })
        .catch(err => console.log(err));
      },
      getColumnData(projects) {
        var baseUrl = "https://planner-backend-api.herokuapp.com/";

        if(window.location.hostname == "localhost") {
          baseUrl = "http://localhost:8000/";
        }

        var responses = [];
        var promises = [];

        for(var i = 0; i < projects.length; i++) {
          promises.push(
            axios.get(baseUrl + "api/people-on-projects/", {
              params: {
                proj_id: projects[i].id
              },
              headers: {
                'Authorization': 'Token ' + this.token
              }
            })
            .then(res => {
              responses.push(res.data);
            })
          )
        }

        Promise.all(promises).then(() => {
          for(var i = 0; i < responses.length; i++) {
            var resp = responses[i];
            if(resp.length > 0) {
              var col = {
                name: resp[0].project,
                data: {}
              };

              for(var j = 0; j < resp.length; j++) {
                col.data[resp[j].user] = resp[j].percent_allocated;
              }

              this.peopleOnProjects.push(col);
            }
          }
        });
      }
    },
    created() {
      this.getProjects();
    }
}
</script>
