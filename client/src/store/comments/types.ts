import {ApiActionTypes} from "../api/types";

export interface Comment {
    id?: string;
    comment: string;
    timestamp: number;
}

export interface CommentsDeliveryState {
    isSending: boolean;
    error: string;
}
export type CommentsActionTypes = ApiActionTypes;
