import React, { Component } from 'react';
import './App.scss';
import Comment from '../../components/Comment/Comment';
import {connect} from "react-redux";
import {AppState} from "../../store";
import {CommentList} from "../../components/CommentList/CommentList";
import {fetchComments} from "../../store/api/actions";
import {CommentsPageState} from "../../store/api/types";
import {deleteComment} from "../../store/comments/actions";

interface AppProps {
  fetchComments: any;
  deleteComment: any;
  commentsPageState: CommentsPageState;
}

class App extends Component<AppProps> {

  componentDidMount() {
    this.updateList();
  }

  updateList = () => {
    this.props.fetchComments();
  };

  deleteComment = (id: string) => {
    this.props.deleteComment(id).then(this.updateList)
  };

  render() {
    let listNotLoaded;
    if (this.props.commentsPageState.isLoadingData) {
      listNotLoaded = <div>Loading...</div>
    }
    if (this.props.commentsPageState.error) {
      listNotLoaded = <div>Error retrieving data from back-end, because: {this.props.commentsPageState.error}</div>
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Feel free to write a comment.
          </p>
          <Comment updateList={this.updateList}/>
          {listNotLoaded ||
          <CommentList
              deleteComment={this.deleteComment}
              updateList={this.updateList}
              comments={this.props.commentsPageState.comments}
          />}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  commentsPageState: state.commentsPageState,
});

export default connect(
    mapStateToProps,
    { fetchComments, deleteComment }
)(App);
