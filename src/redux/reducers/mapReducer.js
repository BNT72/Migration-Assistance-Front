import {GET_MARKER} from "../actions/types";


const initialState = {

    markers: []

}
export default function  (state = initialState, action) {


    switch (action.type) {
        case GET_MARKER:
            return {...state, markers: action.payload}

        default:
            return state
    }


};
