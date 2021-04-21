import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AdditemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './state/todo-lists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/task-lists-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Feelings', filter: 'all'}

    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: 'Lovely', isDone: true},
                {id: v1(), title: 'Cheerful', isDone: true},
                {id: v1(), title: 'Tired', isDone: false}
            ]
        }
    )

    const removeTodolist = (todolistId: string) => {
        dispatchToTodoListsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todolistId, value))
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodoListsReducer(changeTodolistTitleAC(id, newTitle))
    }
    function addTodolist(title: string) {
        dispatchToTasksReducer(addTodolistAC(title))
        dispatchToTodoListsReducer(addTodolistAC(title))

    }


    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, todolistId, newTitle))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }


    const todoListComponent = todoLists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id]
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }
        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        return <Grid item id={tl.id}>
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
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
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
}

export default AppWithReducers;
