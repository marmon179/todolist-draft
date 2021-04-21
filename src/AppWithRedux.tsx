import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AdditemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todo-lists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-lists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = React.memo(() => {
    const todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch]);

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    },[]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    },[dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch]);


    const todoListComponent = todoLists.map((tl) => {
        let tasksForTodolist = tasks[tl.id]

        return <Grid item id={tl.id} key={tl.id}>
            <Paper elevation={10} style={{padding: '10px'}}>
                <Todolist key={tl.id}
                          title={tl.title}
                          tasksForTodolist={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTitle={changeTodolistTitle}
                          filter={tl.filter}
                          id={tl.id}
                          removeTodolist={removeTodolist}
                />
            </Paper>
        </Grid>

    })


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 20px 20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponent}

                </Grid>
            </Container>


        </div>
    );
});

export default AppWithRedux;
