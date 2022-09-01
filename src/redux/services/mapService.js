import axios from "axios";


const API_URL = "http://localhost:8080/map/";

class MapService {

    getMarkers(testType) {
        return axios.post(API_URL,{markerType: testType});
    }

}

export default new MapService();
