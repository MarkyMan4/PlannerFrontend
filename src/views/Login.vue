<template>
  <div>
    <h1>Login</h1>
    <div class="row">
        <div class="col-md"></div>
        <div class="col-md">
            <div class="card mt-5">
                <div class="card-body">
                    <form v-if="token==null" id="projectForm" @submit.prevent="login">
                        <p>
                            <label class="mr-2" for="uname">Username</label>
                            <input required type="text" name="uname" id="uname" v-model="uname" placeholder="username">
                        </p>
                        <p>
                            <label class="mr-2" for="pword">Password</label>
                            <input required type="password" name="pword" id="pword" v-model="pword" placeholder="password">
                        </p>
                        <p>
                            <input class="btn btn-outline-success mt-4" type="submit" value="Login">
                        </p>
                    </form>
                    <div v-else-if="token!=null">
                        <h3>You are logged in</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md"></div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Login',
    components: {

    },
    data() {
        return {
            uname: null,
            pword: null,
            token: localStorage.getItem('user-token')
        }
    },
    methods: {
    login() {
      axios.post('https://planner-backend-api.herokuapp.com/auth/', {
          username: this.uname,
          password: this.pword
      })
      .then(res => {
          this.token = res.data.token;
        //   console.log(this.token);
          localStorage.setItem('user-token', res.data.token);
          this.$router.push({ path : '/' });
          window.location.reload(true);
      })
      .catch(res => {
          console.log(res);
          localStorage.removeItem('user-token');
      });
    }
  },
}
</script>
