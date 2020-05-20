<template>
  <div class="page" v-if="token!=null">
    <h1>Enter New Project</h1>
    <div class="row">
        <div class="col-md"></div>
        <div class="col-md">
            <div class="card mt-5">
                <div class="card-body">
                    <form id="projectForm" @submit.prevent="checkForm">
                        <div class="text-left">
                            <p>
                                <label class="mb-0" for="name"><b>Project Name</b></label>
                            </p>
                            <p class="mb-4">
                                <input required style="width:100%" type="text" name="name" id="name" v-model="name">
                            </p>
                            <p>
                                <label class="mb-0" for="desc"><b>Project Description</b></label>
                            </p>
                            <p class="mb-4">
                                <textarea required style="width:100%" name="desc" id="desc" v-model="desc" placeholder="Description"></textarea>
                            </p>
                            <p>
                                <label class="mb-0" for="start"><b>Start Date</b></label>
                            </p>
                            <p class="mb-4">
                                <input required type="date" name="start" id="start" v-model="start">
                            </p>
                            <p>
                                <label class="mb-0" for="end"><b>End Date</b></label>
                            </p>
                            <p>
                                <input required type="date" name="end" id="end" v-model="end">
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
    <h3>Please login to enter a project</h3>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'EnterProject',
    components: {

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
