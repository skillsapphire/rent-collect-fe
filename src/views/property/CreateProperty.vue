<template>
  <div class="card-container card mx-auto">
    <form @submit="createEditProperty">
      <div class="form-group">
        <input
          type="text"
          v-model="property.name"
          name="PropertyName"
          class="form-control"
          placeholder="Property name"
          v-validate="'required|min:1|max:50'"
        />
      </div>
      <div
        v-if="submitted && errors.has('PropertyName')"
        class="alert alert-danger"
      >{{errors.first('PropertyName')}}</div>
      <div class="form-group">
        <input
          type="text"
          v-model="property.description"
          name="PropertyDescription"
          class="form-control"
          placeholder="Property description"
          v-validate="'required|min:1|max:500'"
        />
      </div>
      <div
        v-if="submitted && errors.has('PropertyDescription')"
        class="alert alert-danger"
      >{{errors.first('PropertyDescription')}}</div>
      <div class="text-center">
        <button class="btn btn-primary">Submit</button>
        <button class="btn btn-danger" @click="resetForm">Reset</button>
      </div>
    </form>
     <div class="container text-center mt-2">
      <span v-show="loading" class="spinner-grow spinner-grow-lg text-info"></span>
    </div>
    <div
      v-if="message"
      class="alert mt-2"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >{{message}}</div>
  </div>
</template>
<script>
import PropertyModel from '../../models/property';
import PropService from '../../services/prop.service';
export default {
  name: 'CreateProperty',
  data() {
    return {
      property: new PropertyModel('', ''),
      message: '',
      successful: true,
      submitted: false,
      loading: false,
    };
  },
  
  mounted(){
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
      this.property = new PropertyModel('', '');
      let propId = this.$route.params.propId;
      if(propId != 'c'){
          PropService.getProperty(this.$store.state.auth.user.id, propId).then(
              response => {
                  this.property = response.data;
              }
          );
      }
  },
  methods: {
      resetForm(){
          this.property = new PropertyModel('', '');
      },
    createEditProperty(e) {
      e.preventDefault();
        this.loading = true;
      this.submitted = true;
      this.$validator.validate().then(isValid => {
          if(isValid){
            let userId = this.$store.state.auth.user.id;
            PropService.createEditProperty(userId, this.property).then(
                response => {
                this.message = 'Property added successfully';
                  this.loading = false;
                },
                error => {
                this.message = 'Error occured while adding property,please try again';
                this.successful = false;
                this.loading = false;
                }
            );
          }
    });
    }
  }
};
</script>
<style scoped>
.card-container.card {
  max-width: 600px !important;
  padding: 40px 40px;
}
</style>