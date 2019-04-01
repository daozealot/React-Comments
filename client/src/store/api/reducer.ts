import {ApiActionTypes, CommentsPageState} from "./types";

const initialState: CommentsPageState = {
    comments: [],
    isLoadingData: false,
    error: ""
};

export function apiReducer(
    state = initialState,
    action: ApiActionTypes
): CommentsPageState {
    switch (action.type) {
        case "API_START":
            return {
                ...state,
                isLoadingData: true,
                error: ""
            };

        case "API_ERROR":
            return {
                ...state,
                isLoadingData: false,
                error: action.payload
            };

        case "API_SUCCESS":
            return {
                comments: action.payload || [],
                isLoadingData: false,
                error: ""
            };

        default:
            return state;
    }
}
