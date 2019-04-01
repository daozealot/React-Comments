import {API_ERROR, API_START, API_SUCCESS} from "../api/types";

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

export function apiSuccess() {
    return {
        type: API_SUCCESS
    };
}

export function submitComment(comment: string, timestamp: string) {
    return makeRequest({
        method: "POST",
        body: JSON.stringify({comment, timestamp})
    });
}

export function deleteComment(id: string) {
    return makeRequest({
        method: "DELETE",
        body: JSON.stringify({id})
    });
}

export function editComment(id: string, comment: string, timestamp: string) {
    return makeRequest({
        method: "PUT",
        body: JSON.stringify({id, comment, timestamp})
    });
}

export function makeRequest(method: object) {
    return (dispatch: any) => {
        dispatch(apiStart());
        return request(method)
            .then(() =>
                dispatch(apiSuccess())
            )
            .catch((error: any) =>
                dispatch(apiError(error.toString()))
            );
    };
}

function request(method: object) {
    const methodWithHeaders = {...method, headers: {'Content-Type': 'application/json'}};
    return fetch(`${process.env.REACT_APP_BASE_URL}comment`, methodWithHeaders)
        .then(checkStatus)
        .then(res => res.text())
}

function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    console.log(error);
    throw error;
}
