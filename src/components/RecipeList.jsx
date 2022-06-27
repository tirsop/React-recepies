import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import Trashcan from '../assets/trashcan.svg'
import { db } from '../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const { mode } = useContext(ThemeContext)

  if (recipes.length === 0) {
    return <div className="error">No recepies available in this site</div>
  }

  const handleClick = async (id) => {
    await deleteDoc(doc(db, 'recipes', id))
  }

  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p className="">{recipe.cookingTime} to make</p>
          <div className="">{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this!</Link>
          <img src={Trashcan} alt="delete icon"
            className='delete'
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  )
}
