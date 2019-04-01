import * as React from "react";

interface DeleteCommentInterfaceProps {
    id: string;
    deleteComment: (id: string) => void;
}

export const DeleteComment: React.FC<DeleteCommentInterfaceProps> = ({ id, deleteComment }) => {

    function onDeleteComment() {
        deleteComment(id);
    }

    return (
        <button className="comment-item-button" onClick={onDeleteComment}>X</button>
    );
};
