<template>
  <div v-if="token!=null">
    <h1>Enter New Project</h1>
    <div class="row">
        <div class="col-md"></div>
        <div class="col-md">
            <div class="card mt-5">
                <div class="card-body">
                    <form id="projectForm" @submit.prevent="checkForm">
                        <p>
                            <label class="mr-2" for="name">Project Name</label>
                            <input required type="text" name="name" id="name" v-model="name">
                        </p>
                        <p>
                            <label class="mr-2" for="start">Start Date</label>
                            <input required type="date" name="start" id="start" v-model="start">
                        </p>
                        <p>
                            <label class="mr-2" for="end">End Date</label>
                            <input required type="date" name="end" id="end" v-model="end">
                        </p>
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
            start: null,
            end: null,
            token: localStorage.getItem('user-token')
        }
    },
    methods: {
    checkForm() {
      const headers = {
          'Authorization': 'Token ' + this.token
      }
      axios.post('http://localhost:8000/api/projects/', {
          name: this.name,
          start_date: this.start,
          end_date: this.end
      },
      {
          headers: headers
      })
      .then(res => (console.log(res.data)))
      .catch(res => (console.log(res)));
    }
  },
}
</script>
