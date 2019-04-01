import {Comment} from "../comments/types";

export const API_START = "API_START";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";

export interface CommentsPageState {
    comments: Comment[];
    isLoadingData: boolean;
    error: string;
}

export interface ApiStartAction {
    type: typeof API_START;
}

export interface ApiErrorAction {
    type: typeof API_ERROR,
    payload: string
}

export interface ApiSuccessAction {
    type: typeof API_SUCCESS,
    payload: Comment[]
}

export type ApiActionTypes = ApiStartAction | ApiErrorAction | ApiSuccessAction;
