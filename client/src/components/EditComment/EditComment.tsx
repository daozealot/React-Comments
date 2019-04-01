import * as React from "react";
import Comment from '../Comment/Comment';
import {Comment as CommentInterface} from "../../store/comments/types";
import {Component} from "react";
import {AppState} from "../../store";
import {connect} from "react-redux";
import {editComment} from "../../store/comments/actions";

interface EditCommentInterfaceProps {
    comment: CommentInterface;
    editComment: any;
    updateList: () => void;
}

class EditComment extends Component<EditCommentInterfaceProps> {

    state = {
        edit: false
    };

    onEdit = () => {
        this.setState({edit: !this.state.edit});
    };

    onCommentEdit = (comment: string) => {
        const id = this.props.comment.id ? this.props.comment.id.toString() : "";
        this.props.editComment(
            id,
            comment,
            this.props.comment.timestamp
        )
        .then(this.props.updateList);
    };

    render() {
        return (
            <div className="comment-edit-container">
                {!this.state.edit && <button className="comment-item-button" onClick={this.onEdit}>Edit</button>}
                {this.state.edit && <Comment updateList={this.props.updateList} returnComment={this.onCommentEdit}/>}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    commentsDeliveryState: state.commentsDeliveryState,
});

export default connect(
    mapStateToProps,
    { editComment }
)(EditComment);


