import React, {Component} from 'react';

import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            comments: []
        }
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
    }
    render() {
        const {comments} = this.state;
        return (
            <div className="wrapper">
                <CommentInput handleSubmit={this.handleSubmit}/>
                {comments.length > 0 && <CommentList comments={comments}/>}
            </div>
        )
    }
}