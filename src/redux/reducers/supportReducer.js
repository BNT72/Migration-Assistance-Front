import {GET_ALL_DIALOGS, GET_DIALOG, POST_MESSAGE} from "../actions/types";


const initialState = {

    dialog: [],
    dialogs:[]

}
export default function  (state = initialState, action) {


    switch (action.type) {
        case GET_DIALOG:
            return {...state, dialog: action.payload}

        case GET_ALL_DIALOGS:
            return {...state, dialogs: action.payload}

        case POST_MESSAGE:
            return {...state, dialog:action.payload }

        default:
            return state
    }


};
