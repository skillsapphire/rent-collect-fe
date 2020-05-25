<template>
  <div class="container">
    {{emailStatus}}
    <table v-if="rentDetail.username" class="table table-striped">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Start Date</th>
          <th>Property Name</th>
          <th>Property Description</th>
          <th>Rent Amount(Rs)</th>
        </tr>
      </thead>
      <tbody v-if="rentDetail">
        <tr>
          <td>{{rentDetail.username}}</td>
          <td>{{rentDetail.startDate}}</td>
          <td>{{rentDetail.propertyName}}</td>
          <td>{{rentDetail.propertyDesc}}</td>
          <td>
            {{rentDetail.rentAmount}} &nbsp;
            <a
              @click="emailOwner"
              href="https://test.instamojo.com/@laaptulaaptu1/"
              target="_blank"
            >Pay now</a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="container text-center">
    <div v-if ="!message"> Fetching Rent Detail</div>
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
       <div v-if="message">
     <div v-if="!rentDetail.rentAmount" class="alert alert-info">
      No data found
    </div>
    </div>
    </div>
  </div>
</template>
<script>
import PropService from '../../services/prop.service';
export default {
  name: 'TenantRentDetail',
  data() {
    return {
      rentDetail: {},
      message: '',
      emailStatus: '',
      loading:false
    };
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }

    this.loading=true;
    let user = this.$store.state.auth.user;

    PropService.getRentDetail(user.id).then(
      response => {
         this.loading=false;
        this.rentDetail = response.data;
        this.rentDetail.username = user.username;
      },
      error => {
        this.loading=false;
        this.message =
          'Error while retrieving property details,please try again';
      }
    );
  },
  methods: {
    emailOwner() {
      debugger;
      PropService.emailOwner(this.rentDetail).then(
        response => {
          this.emailStatus = response.data;
        },
        error => {
          this.emailStatus = 'error while sending notifying owner';
        }
      );
    }
  }
};
</script>