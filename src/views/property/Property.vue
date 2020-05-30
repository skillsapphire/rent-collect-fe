<template>
  <div class="container">
    <div v-if="message" class="alert alert-danger alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>{{message}}</strong>
    </div>
    <div v-if="properties.length == 0 && !loading" class="alert alert-info">
      No properties found, please
      <router-link to="/createproperty/c">create property</router-link>
    </div>

    <div class="container text-center" v-if ="loading && !message">
      <div>Fetching Properties Detail</div>
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
    </div>

    <div v-if="totalPropertiesCount != 0">
      <span
        v-if="totalPropertiesCount != 0"
        class="display-4">Total properties: {{totalPropertiesCount}}</span>
      <div class="d-flex mt-5">
        <label for="attribute">Filter By</label>
        <div class="form-group ml-2">
          <select
            id="attribute"
            class="form-control"
            v-model="selectedField"
            v-on:change="filterProperty()"
          >
            <option
              v-bind:value="selectedItem.empId"
              v-for="selectedItem in selectedFieldList"
              :key="selectedItem.empId"
            >{{selectedItem.empValue}}</option>
          </select>
        </div>
        <div class="form-group ml-2">
          <select
            id="order"
            class="form-control"
            v-model="selectedOrder"
            v-on:change="filterProperty()"
          >
            <option
              v-bind:value="selectedOrderItem"
              v-for="selectedOrderItem in selectedOrderList"
              :key="selectedOrderItem"
            >{{selectedOrderItem}}</option>
          </select>
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

      <nav>
        <ul class="pagination">
          <li class="page-item" :class="currentPage==0 ? 'disabled': ''">
            <a
              class="page-link"
              href="#"
              @click="getAllProperties(currentPage-1, selectedField, selectedOrder)"
            >Previous</a>
          </li>
          <li
            class="page-item"
            :class="currentPage == (page-1) ? 'active': ''"
            v-for="page in totalPages"
            :key="page"
          >
            <!--currentPage={{currentPage}} ::page-1= {{page-1}}::{{currentPage == (page-1)}}-->
            <a
              class="page-link"
              href="#"
              @click="getAllProperties(page-1, selectedField, selectedOrder)"
            >{{page}}</a>
          </li>
          <li class="page-item" :class="currentPage<totalPages-1 ? '': 'disabled'">
            <a
              class="page-link"
              href="#"
              @click="getAllProperties(currentPage+1, selectedField, selectedOrder)"
            >Next</a>
          </li>
        </ul>
      </nav>
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
      loading:true,
      message: '',
      currentPage: 0,
      selectedField: '',
      selectedFieldList: [
        { empId: 'createdAt', empValue: 'Created date' },
        { empId: 'name', empValue: 'Property title' }
      ],
      selectedOrder: '',
      selectedOrderList: ['Asc', 'Desc']
    };
  },

  methods: {
    filterProperty() {
      this.getAllProperties(
        this.currentPage,
        this.selectedField,
        this.selectedOrder
      );
    },
    isDisabled() {
      return this.property.rented;
    },
    getAllProperties(pageNo, selectedField, selectedOrder) {
      this.currentPage = pageNo;
      if (pageNo != 0 && pageNo > this.totalPages - 2) {
        this.isLastPage = true;
      } else {
        this.isLastPage = false;
      }
      
      PropService.getAllProperties(
        this.$store.state.auth.user.id,
        pageNo,
        selectedField,
        selectedOrder
      ).then(
        response => {
          this.loading = false;
          this.properties = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalPropertiesCount = response.data.totalElements;
          console.log(response);
        },
        error => {
          this.message = 'Error occured, please try again later';
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
    this.selectedOrder = this.selectedOrderList[0];
    this.selectedField = this.selectedFieldList[0]['empId'];
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    this.getAllProperties(0, this.selectedField, this.selectedOrder);
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