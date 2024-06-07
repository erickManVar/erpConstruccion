import axios from 'axios';

class AuthService {
  async login(email, password) {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      const userResponse = await axios.get('http://localhost:3000/auth/current', {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      });
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      console.log('Logged in user:', userResponse.data); // Add this line for debugging
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
