import {TaskStateType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './task-lists-reducer';
import {addTodolistAC, removeTodolistAC} from './todo-lists-reducer';

let startState: TaskStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Lovely', isDone: true},
            {id: '2', title: 'Cheerful', isDone: true},
            {id: '3', title: 'Tired', isDone: false}
        ]
    };
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();

})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(false);

})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', false, 'todolistId2');

    const endState = tasksReducer(startState, action)

    // expect(endState['todolistId2'][1].isDone).toBeFalsy();
    // expect(endState['todolistId1'][1].isDone).toBeTruthy();
    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'Banana', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Banana');
    expect(endState['todolistId1'][1].title).toBe('JS');

})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})


