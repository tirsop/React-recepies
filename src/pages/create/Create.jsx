import { useState, useRef } from 'react'

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])

  // lines 14, 47 and 28 to focus the curson on input once we press add
  const ingredientInput = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title, method, cookingTime, ingredients);
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
    <div className='create'>
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
          <button onClick={handleAdd} className='btn'>Add</button>
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

        <button className='btn'>Sumbit</button>

      </form>
    </div>
  )
}
