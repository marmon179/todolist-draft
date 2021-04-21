import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {Bathtub} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.ctrlKey && e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    return <div>
        <TextField value={newTaskTitle}
                   variant={'outlined'}
                   label={'Type value'}
                   error={!!error}
                   helperText={error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}

        />
        <IconButton onClick={addItem} color={'primary'}>
            <Bathtub/>
        </IconButton>
    </div>
})