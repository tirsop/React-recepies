// import { useFetch } from '../../hooks/useFetch'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
// components
import RecipeList from '../../components/RecipeList'
// styles
import './Home.css'

export default function Home() {
  // const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')
  const [recipes, setRecipes] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    getDocs(collection(db, 'recipes'))
      .then(snapshot => {
        if (snapshot.empty) {
          setError("No recipes to load")
          setIsPending(false)
        } else {
          // console.log(snapshot.docs[0].data());
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() })
          })
          setRecipes(results)
          setIsPending(false)
        }
      })
  }, [])
  const { mode } = useContext(ThemeContext)  // to style dark mode

  return (
    <div className='home'>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className='loading'>Loading.........</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
