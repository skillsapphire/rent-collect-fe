<template>
  <div class="container">
    <div v-if="message">{{message}}</div>
    <div class="card" v-if="!message">
      <div class="card-header">Property Details</div>
      <div class="card-body">
        <div>Property Id:{{property.id}}</div>
        <div>Property Name:{{property.name}}</div>
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
      message: '',
      status: false,
      hideDetails: true
    };
  },
  mounted() {
    let propId = this.$route.params.propId;
    PropService.getProperty(this.$store.state.auth.user.id, propId).then(
      response => {
          this.property = response.data;
      },
      error => {
        this.message =
          'Error while retrieving property details,please try again';
      }
    );
  }
};
</script>