<template>
  <div class="container">
    <span
      v-if="totalPropertiesCount != 0"
      class="display-4"
    >Total properties: {{totalPropertiesCount}}</span>
    <div v-if="message">
      <div v-if="properties.length == 0" class="alert alert-info">
        No properties found, please
        <router-link to="/createproperty">create property</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12" v-for="property in properties" :key="property.id">
        <div class="card shadow">
          <div class="card-body col-lg-6">
            <h4 class="card-title">{{property.name}}</h4>
            <p class="card-text">{{property.description}}</p>
            <a href="#" @click="propertyDetail(property.id)" class="card-link">Detail</a>
            <a href="#" @click="editProperty(property)" class="card-link">Edit</a>
            <a href="#" @click="deleteProperty(property.id)" class="card-link">Delete</a>
          </div>
          <div class="col-lg-6">
            <button
              class="btn btn-info"
              :disabled="property.rented"
              @click="rentProperty(property.id)"
            >Rent this property</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container text-center">
      <div v-if="!message">Fetching Properties Detail</div>
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
    </div>

    <nav>
      <ul class="pagination">
        <li class="page-item" :class="currentPage==0 ? 'disabled': ''">
          <a class="page-link" href="#" @click="getAllProperties(currentPage-1)">Previous</a>
        </li>
        <li class="page-item" :class="currentPage == (page-1) ? 'active': ''" v-for="page in noOfPages" :key="page">
          <a class="page-link" href="#" @click="getAllProperties(page-1)">{{page}}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" :class="isLastPage ? 'disabled': ''" 
          @click="getAllProperties(currentPage+1)">Next</a>
        </li>
      </ul>
    </nav>
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
      message: '',
      noOfPages: 0,
      currentPage: 0,
      isLastPage: false
    };
  },

  methods: {
    isDisabled() {
      return this.property.rented;
    },
    getAllProperties(pageNo) {
      this.currentPage = pageNo;
      if(pageNo < this.noOfPages){
        this.isLastPage = true;
      }else{
        this.isLastPage = false;
      }
      this.loading = true;
      PropService.getAllProperties(this.$store.state.auth.user.id, pageNo).then(
        response => {
          this.properties = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalPropertiesCount = response.data.numberOfElements;
          this.noOfPages = Math.ceil(response.data.totalElements / response.data.pageable.pageSize);
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
          this.getAllProperties(0);
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
    },
    rentProperty(propertyId) {
      this.$router.push('/rent/' + propertyId);
    }
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    this.isActive = true;
    this.getAllProperties(0);
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