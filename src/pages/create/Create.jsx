import { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'
// import { useFetch } from '../../hooks/useFetch'

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const navigate = useNavigate()
  const { mode, color } = useContext(ThemeContext)

  // lines 14, 47 and 28 to focus the curson on input once we press add
  const ingredientInput = useRef(null)

  // const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = { title, ingredients, method, cookingTime: `${cookingTime} minutes` }
    try {
      await addDoc(collection(db, 'recipes'), doc)
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className={`create ${mode}`}>
      <h2 className='page-title'>Add a new recipe</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Reciple title:</label>
        <input type="text" id='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required />

        <label htmlFor="ing">Recipe ingredients:</label>
        <div className="ingredients">
          <input type="text" id='ing'
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput} />
          <button
            onClick={handleAdd}
            className='btn'
            style={{ backgroundColor: color }}
          >Add</button>
        </div>
        {ingredients.length === 0 && <p className='ing-check'>No ingredients added so far</p>}
        {ingredients.length > 0 &&
          <p className='ing-check'>Current ingredients: {ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>
        }

        <label htmlFor="method">How do you prepare it?</label>
        <textarea id="method" cols="30" rows="10"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required />

        <label htmlFor="time">Cooking time in minutes:</label>
        <input type="number" id="time"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required />

        <button
          className='btn'
          style={{ backgroundColor: color }}
        >Sumbit</button>

      </form>
    </div>
  )
}
