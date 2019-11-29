/**
 * Created by anchao on 2016/6/30.
 */

import { connect, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import VisibleTodoList from '../../components/visibleTodoList'
import Utils from '../../utils'

const todosSelector = state => state.todos.todoList.get('list')
const todoFilterSelector = state => state.todos.todoFilter

const todosByFilterSelector = createSelector([todosSelector, todoFilterSelector], (list, filter) => ({
    todos: Utils.selectByFilter(list, filter).toJS()
}))

export default connect(todosByFilterSelector, actionCreator)(VisibleTodoList)
