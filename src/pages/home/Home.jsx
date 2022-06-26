import { useFetch } from '../../hooks/useFetch'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
// components
import RecipeList from '../../components/RecipeList'

// styles
import './Home.css'

export default function Home() {
  const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')
  const { mode } = useContext(ThemeContext)

  return (
    <div className='home'>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className='loading'>Loading.........</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
