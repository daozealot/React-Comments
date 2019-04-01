import { API_ERROR, API_START, API_SUCCESS } from "./types";

export function apiStart() {
    return {
        type: API_START,
    };
}

export function apiError(error: string) {
    return {
        type: API_ERROR,
        payload: error
    };
}

export function apiSuccess(comments: Comment[]) {
    return {
        type: API_SUCCESS,
        payload: comments
    };
}

function getComments() {
    return fetch(`${process.env.REACT_APP_BASE_URL}comments/sort/desc/timestamp`)
        .then(checkStatus)
        .then(parseJSON);
}

function parseJSON(response: any) {
    return response.json();
}

function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    console.log(error);
    throw error;
}

export function fetchComments() {
    return (dispatch: any) => {
        dispatch(apiStart());
        return getComments()
            .then((json: any) =>
                dispatch(apiSuccess(json))
            )
            .catch((error: any) =>
                dispatch(apiError(error.toString()))
            );
    };
}

