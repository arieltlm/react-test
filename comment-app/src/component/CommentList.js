import React, {Component} from 'react';

import Comment from './Comment';

export default class CommentInput extends Component {
    static defaultProps = {
        comments: []
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {comments} = this.props;
        return (
            <div className="comment-list">
                {comments.length > 0 && comments.map((item, index) => (
                    <Comment username={item.username} content={item.content} key={index}/>
                ))}
            </div>
        )
    }
}