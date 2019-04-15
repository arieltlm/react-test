import React, {Component} from 'react';

import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import WordAdder from "./PureComponentTest";

import wrapWithLoadData from './wrapWithLoadData'

class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            comments: [],
        }
    }
    componentWillMount() {
        this._loadComments();
    }
    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    _loadComments() {
        const comments = localStorage.getItem('comments');
        comments && this.setState({comments: JSON.parse(comments)})
    }
    handleSubmit = (comment) => {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        // bug--array.push返回的是array的新长度，并不是array
        // this.setState((prevState) => {
        //     return { comments: prevState.comments.push(comment)}
        // })
        const {comments} = this.state;
        comments.push(comment);
        this.setState({comments})
        this._saveComments(comments);
    }
    handleDelete = (index) => {
        const {comments} = this.state;
        comments.splice(index,1);
        this.setState({comments});
        this._saveComments(comments);
    }
    render() {
        const {comments} = this.state;
        return (
            <div className="wrapper">
                <CommentInput handleSubmit={this.handleSubmit}/>
                {comments.length > 0 && <CommentList comments={comments} handleDelete={this.handleDelete}/>}
                <WordAdder />
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp