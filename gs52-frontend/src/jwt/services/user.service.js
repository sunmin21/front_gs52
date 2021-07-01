import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/test/';

class UserService {
  
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {

    console.log('1111 : user' + authHeader());

    return axios.get(API_URL + 'user', { headers: authHeader() });
    // return axios.get(API_URL + 'user');
  }

  getModeratorBoard() {

    console.log('222 : mod' + authHeader());

    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    console.log('333 : admin' + authHeader());

    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
