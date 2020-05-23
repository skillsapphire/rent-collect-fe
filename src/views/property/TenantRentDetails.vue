<template>
  <div class="container">
     <table v-if = 'rentDetail.username' class="table table-striped">
    <thead>
      <tr>
        <th>User Name</th>
        <th>Start Date</th>
        <th>Property Name</th>
        <th>Property Description</th>
        <th>Rent Amount(Rs)</th>
      </tr>
    </thead>
    <tbody v-if = 'rentDetail' >
      <tr>
        <td>{{rentDetail.username}}</td>
        <td>{{rentDetail.startDate}}</td>
        <td>{{rentDetail.propertyName}}</td>
        <td>{{rentDetail.propertyDesc}}</td>
        <td>{{rentDetail.rentAmount}}</td>
        <td>{{}}</td>
      </tr>
    </tbody>
  </table>
  <div v-if = 'message'>{{message}}</div>
  </div>
</template>
<script>
import PropService from '../../services/prop.service';
export default {
  name: 'TenantRentDetail',
  data() {
    return {
      rentDetail: {},
      message:''
    };
  },
  mounted(){
      let user = this.$store.state.auth.user;
      PropService.getRentDetail(user.id).then(
      response => {
        this.rentDetail = response.data;
        this.rentDetail.username = user.username;
      },
      error => {
        this.message =
          'Error while retrieving property details,please try again';
      }
    );

  }
}
</script>