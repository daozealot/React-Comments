import { CommentsActionTypes, CommentsDeliveryState } from "./types";

const initialState: CommentsDeliveryState = {
    isSending: false,
    error: ""
};

export function commentsReducer(
    state = initialState,
    action: CommentsActionTypes
): CommentsDeliveryState {
    switch (action.type) {
        case "API_START":
            return {
                ...state,
                isSending: true
            };
        case "API_ERROR":
            return {
                isSending: false,
                error: action.payload
            };
        case "API_SUCCESS":
            return {
                ...state,
                isSending: false,
            };
        default:
            return state;
    }
}
