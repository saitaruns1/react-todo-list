import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Todo from './components/Todo/Todo';

function App() {
  const [idValue, setIdValue] = useState(0)
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()

  const [queryText, setQueryText] = useState("")
  const [dateSelector, setDateSelector] = useState('')
  const [filterCat, setFilterCat] = useState()

  const [editCatSelect, setEditCatSelect] = useState()
  const [editCatText, setEditCatText] = useState("")


  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  const onDateChange = (e) => {
    setDate(e.target.value)
  }

  const onTodoAdd = () => {
    const t = {
      name: todo,
      id: idValue,
      status: false,
      date: date,
      category: selectedCategory,
    }
    setIdValue((id) => id + 1)
    setTodos([...todos, t])
    setTodo("")
  }

  const onDelete = (id) => {
    let newTodos = todos
    let ind = newTodos.findIndex((todo) => todo.id === id)
    newTodos.splice(ind, 1)
    setTodos([...newTodos])
  }

  const onMarkAsDone = (id) => {
    let newTodos = todos
    let ind = newTodos.findIndex((todo) => todo.id === id)
    newTodos[ind].status = !newTodos[ind].status
    setTodos([...newTodos])
  }


  const onQueryChange = (e) => {
    setQueryText(e.target.value)
  }

  const onEdit = (id, payload) => {
    const { eText, eDate, eCat } = payload
    let newTodos = todos
    let ind = newTodos.findIndex((todo) => todo.id === id)
    newTodos[ind].name = eText
    newTodos[ind].date = eDate
    newTodos[ind].category = eCat
    setTodos([...newTodos])
  }

  const handleClear = () => {
    setDateSelector('')
    setQueryText('')
    setFilterCat('All')
  }

  const onCategoryAdd = () => {
    setCategories([...categories, category])
    setCategory("")
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleEditSelectCatChange = (e) => {
    setEditCatSelect(e.target.value)
    setEditCatText(e.target.value)
  }

  const handleEditSelectCat = () => {
    let newCats = categories
    let ind = newCats.findIndex((cat) => cat === editCatSelect)
    newCats[ind] = editCatText
    setCategories([...newCats])
    setEditCatSelect(editCatText)
  }

  const handleDeleteSelectCat = () => {
    let newCats = categories.filter((cat) => cat !== editCatSelect)
    setCategories([...newCats])
    setEditCatText("")
  }

  const handleFilterCatChange = (e) => {
    setFilterCat(e.target.value)
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder='Add Todo' value={todo} onChange={onTodoChange} />
        <input type="date" value={date} onChange={onDateChange} id="" />
        <select value={selectedCategory} onChange={handleCategoryChange} >
          <option key="-1" value="All" >All</option>
          {categories.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
        <Button text='Add' callBack={onTodoAdd} color={""} />
      </div>

      <div><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Button text="Add Category" callBack={onCategoryAdd} /></div>


      <div>
        <select value={editCatSelect} onChange={handleEditSelectCatChange} >
          <option key="-1" value="All" >All</option>
          {categories.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" value={editCatText} onChange={(e) => setEditCatText(e.target.value)} />
        <Button text="Edit Category" callBack={handleEditSelectCat} />
        <Button text="Delete Category" callBack={handleDeleteSelectCat} />
      </div>

      <div>
        <input type="text" placeholder='Search' value={queryText} onChange={onQueryChange} />
        <input type="date" value={dateSelector} onChange={(e) => setDateSelector(e.target.value)} />
        <select value={filterCat} onChange={handleFilterCatChange} >
          <option key="-1" value="All" >All</option>
          {categories.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
        <Button text="Clear" callBack={handleClear} />
      </div>


      {todos.map((todo) => {
        return (todo.name.includes(queryText) &&
          (filterCat === 'All' || todo.category === filterCat) &&
          (dateSelector === '' || new Date(todo.date) <= new Date(dateSelector))) && <Todo key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} onMarkAsDone={onMarkAsDone} allCategories={categories} />
      })}
    </div>
  );
}

export default App;
