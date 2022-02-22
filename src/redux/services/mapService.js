import axios from "axios";
import authHeader from "./auth-header";
import {getMarker} from "../actions/map";

const API_URL = "http://localhost:8080/api/map/";

class MapService {

    getMarkers(testType) {
        return axios.post(API_URL,testType);
    }

}

export default new MapService();
