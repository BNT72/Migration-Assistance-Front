import {
    GET_MARKER
} from "./types";

import MapService from "../services/mapService";

export const getMarker = (markerType) => (dispatch) => {
    return MapService.getMarkers(markerType).then(
        (response) => {
            dispatch({
                type: GET_MARKER,
                payload: response.data
            });

            return Promise.resolve();
        }
    );
};
