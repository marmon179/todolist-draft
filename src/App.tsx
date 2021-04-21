import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AdditemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'Feelings', filter: 'all'}

    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
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
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const todoList = todoLists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        }
    }
    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodoLists([todolist, ...todoLists])
        setTasks({...tasksObj, [todolist.id]: []})
    }


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }



    const todoListComponent = todoLists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id]
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }
        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        return <Grid item id={tl.id} >
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

export default App;
