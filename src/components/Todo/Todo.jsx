import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'

const Todo = ({ todo, onDelete, onMarkAsDone, onEdit, allCategories }) => {
    const [editMode, setEditMode] = useState(false)

    const [editText, setEditText] = useState()
    const [editDate, setEditDate] = useState(new Date().toJSON().slice(0, 10))
    const [categories,setCategories] = useState([])
    const [selectedCategory,setSelectedCategory] = useState()

    useEffect(() => {
        setEditText(todo.name)
        setCategories(allCategories)
    }, [todo,allCategories])


    const handleEditBtn = () => {
        const payload = {
            eText: editText,
            eDate: editDate,
            eCat : selectedCategory
        }
        onEdit(todo.id, payload)
        setEditMode((x) => !x)
    }

    const handleCategoryChange = (e)=>{
        setSelectedCategory(e.target.value)
    }

    return (
        <div className='todo'>

            {!editMode ?
                <span style={{ cursor: "pointer" }} onClick={() => setEditMode(x => !x)}>
                    {todo.status ? <s>{todo.name}</s> : todo.name}
                </span>
                :
                <>
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                    <select value={selectedCategory} onChange={handleCategoryChange} >
                        {categories.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                        ))}
                    </select>
                    <Button text={"Edit"} callBack={handleEditBtn} />
                    <Button text={"Cancel"} callBack={() => setEditMode(x => !x)} />
                </>
            }
            <span>{todo.date}</span>
            <span>{todo.category}</span>
            <input type="checkbox" name="" onChange={() => { onMarkAsDone(todo.id) }} id="" />
            <Button color={"red"} callBack={() => onDelete(todo.id)} text={"Delete"} />
        </div>
    )
}

export default Todo