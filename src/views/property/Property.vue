<template>
  <div class="container">
    <span
      v-if="totalPropertiesCount != 0"
      class="display-4"
    >Total properties: {{totalPropertiesCount}}</span>
    <div v-if="message" class="alert alert-danger alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>{{message}}</strong>
    </div>
    <div v-if="properties.length == 0" class="alert alert-info">
      No properties found, please
      <router-link to="/createproperty">create property</router-link>
    </div>
    <div class="row">
      <div class="col-12" v-for="property in properties" :key="property.id">
        <div class="card shadow">
          <div class="card-body">
            <h4 class="card-title">{{property.name}}</h4>
            <p class="card-text">{{property.description}}</p>
            <a href="#" @click="propertyDetail(property.id)" class="card-link">Detail</a>
            <a href="#" @click="editProperty(property)" class="card-link">Edit</a>
            <a href="#" @click="deleteProperty(property.id)" class="card-link">Delete</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
    </div>
  </div>
</template>

<script>
import PropService from '../../services/prop.service';

export default {
  name: 'Property',
  data() {
    return {
      properties: [],
      totalPropertiesCount: 0,
      totalPages: 0,
      loading: false,
      message: ''
    };
  },

  methods: {
    getAllProperties() {
      this.loading = true;
      PropService.getAllProperties(this.$store.state.auth.user.id).then(
        response => {
          this.properties = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalPropertiesCount = response.data.numberOfElements;
          this.loading = false;
        },
        error => {
          this.message = 'Error occured, please try again later';
          this.loading = false;
        }
      );
    },
    deleteProperty(propertyId) {
      this.loading = true;
      PropService.deleteProperty(
        this.$store.state.auth.user.id,
        propertyId
      ).then(
        response => {
          this.getAllProperties();
          this.loading = false;
        },
        error => {
          this.message = 'Error occurred please try again';
          this.loading = false;
        }
      );
    },
    editProperty(property) {
      this.$router.push('/createproperty/' + property.id);
    },
    propertyDetail(propertyId) {
      this.$router.push('/propertyDetail/' + propertyId);
    }
  },
  mounted() {
    this.getAllProperties();
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