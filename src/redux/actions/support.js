import {GET_ALL_DIALOGS, GET_DIALOG, POST_MESSAGE} from "./types";

import SupportService from "../services/supportService";

export const getDialog = (userName) => (dispatch) => {
    return SupportService.getDialog(userName).then(
        (response) => {
            dispatch({
                type: GET_DIALOG,
                payload: response.data
            });

            return Promise.resolve();
        }
    );
};

export const getAllDialogs = () => (dispatch) => {
    return SupportService.getAllDialogs().then(
        (response) => {
            dispatch({
                type: GET_ALL_DIALOGS,
                payload: response.data
            });

            return Promise.resolve();
        }
    );
};

export const setMessage = (userName,message) => (dispatch) => {

    return SupportService.setMessage(userName,message).then(
        (response) => {
            dispatch({
                type: POST_MESSAGE,
                payload: response.data
            });

            return Promise.resolve();
        }
    );
};