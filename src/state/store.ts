import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './task-lists-reducer';
import {todoListsReducer} from './todo-lists-reducer';
import {TaskStateType, TodolistType} from '../AppWithRedux';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todoLists: Array<TodolistType>
//     tasks: TaskStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store