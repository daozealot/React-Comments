import * as React from "react";
import EditComment from "../EditComment/EditComment";
import {Comment} from "../../store/comments/types";
import {DeleteComment} from "../DeleteComment/DeleteComment";

interface CommentListProps {
    comments: Comment[];
    deleteComment: (id: string) => void;
    updateList: () => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, deleteComment, updateList }) => {
    return (
        <div className="comment-list">
            {comments.map((item: Comment) => (
                <div className="comment-item" key={item.timestamp}>
                    <p>{item.comment}</p>
                    <EditComment comment={item} updateList={updateList}/>
                    <DeleteComment id={item.id || ""} deleteComment={deleteComment}/>
                </div>
            ))}
        </div>
    );
};
