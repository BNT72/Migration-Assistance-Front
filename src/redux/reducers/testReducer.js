import {GET_TEST} from "../actions/types";


const initialState = {

    testValue: []

}
export default function  (state = initialState, action) {


    switch (action.type) {
        case GET_TEST:
            return {...state, testValue: action.payload}

        default:
            return state
    }


};
