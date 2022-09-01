import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const API_URL = "http://localhost:8080/user/";

class AuthService {

  login(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return axios
      .post('http://localhost:8080/user/login', params)
      .then((response) => {
        if (response.data.body.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.body));
        }

        return response.data.body;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return axios.post('http://localhost:8080/user/register', params);
  }
}

export default new AuthService();
