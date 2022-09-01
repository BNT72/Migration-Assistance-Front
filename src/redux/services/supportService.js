import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/controller/";

class SupportService {

    getDialog(userName) {
        return axios.get(API_URL+userName, { headers: authHeader() });
    }

    getAllDialogs() {
        return axios.get(API_URL);
    }

    setMessage(userName,message) {
        return axios.post(API_URL+userName,message);
    }

}

export default new SupportService();
