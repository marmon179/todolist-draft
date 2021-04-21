import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
});