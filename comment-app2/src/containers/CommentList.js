import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { initComments, deleteComment } from '../reducers/comments';

// CommentListContainer
// 一个Smart组件，负责评论列表数据的加载、初始化、删除评论
// 沟通 CommentList 和 state
class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    componentWillMount () {
        // 初始化评论
        this._loadComments();
    }

    _loadComments () {
        // 从 LocalStorage中加载评论
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];
        // this.props.initComments是connect传进来的
        // 可以帮我们把数据初始化到state里面去
        this.props.initComments(comments);
    }

    handleDeleteComment = (index) => {
        const {comments} = this.props;
        // props 是不能变的，所以这里新建一个删除了特定下标的评论列表
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        this.props.onDeleteComment && this.props.onDeleteComment(index);
    }

    render () {
        return (
            <CommentList
                comments={this.props.comments}
                handleDelete={this.handleDeleteComment}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)