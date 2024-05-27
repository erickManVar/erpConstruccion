import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/';

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + 'login', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } else {
        // Si no hay token, suponemos que el backend envió algún mensaje de error.
        throw new Error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;  // Lanzar el error para que pueda ser capturado en el componente que invoca este método.
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
