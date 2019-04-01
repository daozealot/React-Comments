import * as React from "react";
import {Component} from "react";
import {AppState} from "../../store";
import {connect} from "react-redux";
import {submitComment} from "../../store/comments/actions";
import {CommentsDeliveryState} from "../../store/comments/types";

export const INPUT_MAX_LENGTH = 100;

interface CommentProps {
    submitComment: any;
    commentsDeliveryState: CommentsDeliveryState;
    updateList: () => void;
    returnComment?: (comment: string) => void;
}

class Comment extends Component<CommentProps> {

    state = {
        comment: ""
    };

    submitComment = () => {
        if (this.props.returnComment) {
            this.props.returnComment(this.state.comment);
        } else {
            this.props.submitComment(this.state.comment, new Date().getTime().toString())
                .then(() => this.props.updateList());
        }
        this.setState({ comment: "" });
    };

    onChange = (event: any) => {
        this.setState({ comment: event.target.value });
    };

    render() {
        return (
            <div className="comment-container">
                <input
                    className="comment-input"
                    placeholder="Enter comment"
                    value={this.state.comment}
                    onChange={this.onChange}
                    maxLength={INPUT_MAX_LENGTH}
                />
                <button
                    onClick={this.submitComment}
                    disabled={!this.state.comment.length || this.state.comment.length >= INPUT_MAX_LENGTH}
                >
                    {this.props.returnComment ? "Edit" : "Submit"}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    commentsDeliveryState: state.commentsDeliveryState,
});

export default connect(
    mapStateToProps,
    { submitComment }
)(Comment);

