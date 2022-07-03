import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext"
import { db } from "../../firebase/config"
import { doc, getDoc } from "firebase/firestore"
// import { useFetch } from '../../hooks/useFetch'


// styles
import './Recipe.css'

export default function Recipe() {
  const { mode } = useContext(ThemeContext)  // fot styling the dark mode
  const { id } = useParams()
  // const url = `http://localhost:3000/recipes/${id}`
  // const { data: recipe, isPending, error } = useFetch(url)
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    getDoc(doc(db, 'recipes', id))
      .then(doc => {
        if (doc.exists()) {
          setIsPending(false)
          setRecipe(doc.data())
        } else {
          setIsPending(false)
          setError("Could not find that recipe")
        }
      })
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading.........</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Cooking time: {recipe.cookingTime}.</p>
          <p className="">Ingredients: </p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
            {/* using ing as keys bc they're unique */}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}
