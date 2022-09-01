import axios from "axios";

const API_URL = "http://localhost:8080/test/";

class TestService {

    getTest(testType) {
        return axios.post(API_URL,{testType: testType});
    }

}

export default new TestService();
