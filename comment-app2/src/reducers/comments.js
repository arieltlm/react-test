const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export default function(state, action) {
    if(!state) {
        state = { comments: []}
    }
    switch(action.type) {
        case INIT_COMMENTS:
            //  初始化评论
            return {comments: action.comments}
        case ADD_COMMENT:
            // 添加评论
            return {
                comments:[...state.comments, action.comment]
            }
        case DELETE_COMMENT:
            // 删除评论
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state;
    }
}

export const initComments = (comments) => {
    return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
    return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
    return { type:DELETE_COMMENT, commentIndex }
}

/* 个人写 reducer 文件的习惯，仅供参考：

1.定义 action types
2.编写 reducer
3.跟这个 reducer 相关的 action creators */