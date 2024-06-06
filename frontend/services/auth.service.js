import axios from 'axios';

class AuthService {
  async login(email, password) {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
