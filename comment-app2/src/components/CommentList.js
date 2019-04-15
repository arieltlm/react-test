import React, {Component} from 'react';

import Comment from './Comment';
import PropTypes from 'prop-types';

export default class CommentInput extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired,
        handleDelete: PropTypes.func
    }
    static defaultProps = {
        comments: []
    }
    
    handleDelete = (index) => {
        this.props.handleDelete && this.props.handleDelete(index)
    }

    render() {
        const {comments} = this.props;
        return (
            <div className="comment-list">
                {comments.length > 0 && comments.map((item, index) => (
                    <Comment 
                    username={item.username}
                    content={item.content}
                    createdTime={item.createdTime}
                    key={index}
                    index={index}
                    handleDelete={this.handleDelete}/>
                ))}
            </div>
        )
    }
}