import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';

type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTittleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return <div className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
        <Checkbox
            color={'primary'}
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTittleHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})