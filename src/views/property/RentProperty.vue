<template>
  <div class="container">
    
      {{propertyData.name}}
      {{propertyData.description}}
      <h3>User Details</h3>
    <form @submit="rentProperty">
      <div class="form-group">
        <input
          type="text"
          v-model="rent.startDate"
          name="startDate"
          class="form-control"
          placeholder="Rent Start Date"
          v-validate="'required|min:1|max:50'"
        />
      </div>
       <div class="form-group">
        <input
          type="text"
          v-model="rent.rentAmount"
          name="rentAmount"
          class="form-control"
          placeholder="Rent amount"
          v-validate="'required|min:1|max:50'"
        />
      </div>
        <div class="form-group">
        <input
          type="text"
          v-model="rent.user.username"
          name="userName"
          class="form-control"
          placeholder="User Name"
          v-validate="'required|min:1|max:50'"
        />
      </div>
        <div class="form-group">
        <input
          type="text"
          v-model="rent.user.email"
          name="email"
          class="form-control"
          placeholder="Email"
          v-validate="'required|min:1|max:50'"
        />
      </div>
        <div class="form-group">
        <input
          type="text"
          v-model="rent.user.password"
          name="password"
          class="form-control"
          placeholder="password"
          v-validate="'required|min:1|max:50'"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if = "rent.id">Property has been rented</div>
  </div>
</template>
<script>
import PropService from '../../services/prop.service';
import PropertyModel from '../../models/property';
import User from '../../models/user';
import Rent from '../../models/rent';
export default {
  name: 'RentProperty',
  data() {
    return {
      rent:  {user:{}},
      propertyData: {}
    };
  },
  mounted() {
    let propId = this.$route.params.propId;
    PropService.getProperty(this.$store.state.auth.user.id, propId).then(
      response => {
        this.propertyData = response.data;
      },
      error => {
        this.message =
          'Error while retrieving property details,please try again';
      }
    );
  },

  methods: {
    rentProperty(e) {
    
        e.preventDefault();
      this.loading = true;
    
      PropService.rentProperty(
        this.propertyData.id,
        this.rent
      ).then(
        response => {
       
            this.rent = response.data;
        },
        error => {}
      );
    }
  }
};
</script>