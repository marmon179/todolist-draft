import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AdditemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    tasksForTodolist: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolist: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() =>
        props.changeFilter('active', props.id), [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    const removeTodolist = useCallback(() => props.removeTodolist(props.id),[props.removeTodolist,props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasksForTodolist
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasksForTodolist.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasksForTodolist.filter(t => !t.isDone)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todoListId={props.id}
                    task={t}
                    key={t.id}
                />)
            }
        </div>

        <div>
            <Button color={'primary'} variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>

            <Button color={'secondary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>

            <Button color={'inherit'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>

        </div>
    </div>
})



