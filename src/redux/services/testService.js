import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

class TestService {

    getTest(testType) {
        return axios.post(API_URL,testType);
    }

}

export default new TestService();
