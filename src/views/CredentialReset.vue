<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="passwordReset">
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            v-model="newPassword"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="Enter new password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" >
            <span  class="spinner-border spinner-border-sm"></span>
            <span>Submit</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-success" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
import PropService from '../services/prop.service';

export default {
  name: 'CredentialReset',
  data() {
    return {
      newPassword:'',
      message: ''
    };
  },
 
  methods: {
      passwordReset(){
          let user = this.$store.state.auth.user;
          let requestObj = {'username': user.username, 'password': this.newPassword};
          PropService.passwordReset(user.id, requestObj).then(
      response => {
        this.message = 'Successful';
      },
      error => {
        this.message =
          'Error while retrieving property details,please try again';
      }
    );
      }
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
}
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>