import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9090/api/';

class PropService {

  property = {};

  setProperty(property){
    this.property = property;
  }
  getPropertyData(){
    return this.property;
  }
  getAllProperties(userId) {
    return axios.get(API_URL + 'property/'+userId, { headers: authHeader() });
  }
  getProperty(userId, propertyId) {
    return axios.get(API_URL + 'user/'+userId+ '/property/'+ propertyId, { headers: authHeader() });
  }
  createEditProperty(userId, property) {
    if(property.id){
      return axios.put(API_URL + 'user/'+userId+ '/property/'+ property.id, property, { headers: authHeader() });
    }
    return axios.post(API_URL + 'property/'+userId, property, { headers: authHeader() });
  }

  deleteProperty(userId, propertyId) {
    return axios.delete(API_URL + 'user/'+userId+ '/property/'+ propertyId, { headers: authHeader() });
  }
  rentProperty(propertyId,rent) {
     
      return axios.post(API_URL + 'rent/'+ propertyId, rent, { headers: authHeader() });
  
  }

  getRentDetail(userId) {
    return axios.get(API_URL + 'rent/'+ userId,{ headers: authHeader() });

}

}

export default new PropService();
