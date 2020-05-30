<template>
  <div class="container">
   
    <div class="card" v-if="!loading && !isError">
      <div class="card-header">Property Details</div>
      <div class="card-body">
        <div>Property Id:{{property.id}}</div>
        <div>Property Name:{{property.name}}</div>
      </div>
    </div>
    <div class="container text-center">
    <div v-if ="loading || isError" class="alert" :class="!loading || isError ? 'alert-danger' : 'alert-success'">{{message}} 
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
    </div>
    </div>
  </div>
</template>
<script>
import PropService from '../../services/prop.service';
import PropertyModel from '../../models/property';
export default {
  name: 'PropertyDetail',
  data() {
    return {
      property: new PropertyModel('', ''),
      message: 'Fetching Property Detail',
      loading: true,
      isError: false
    };
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    let propId = this.$route.params.propId;
    PropService.getProperty(this.$store.state.auth.user.id, propId).then(
      response => {
          this.property = response.data;
          this.loading = false;
      },
      error => {
        this.message =
          'Error while retrieving property details,please try again';
          this.isError = true;
         this.loading = false;
      }
    );
  }
};
</script>