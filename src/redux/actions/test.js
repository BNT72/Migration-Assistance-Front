import {
GET_TEST
} from "./types";

import TestService from "../services/testService";

export const getTest = (testType) => (dispatch) => {
    return TestService.getTest(testType).then(
        (response) => {
            dispatch({
                type: GET_TEST,
                payload: response.data
            });

            return Promise.resolve();
        }
    );
};
