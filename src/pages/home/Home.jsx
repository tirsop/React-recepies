// import { useFetch } from '../../hooks/useFetch'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/config'
// components
import RecipeList from '../../components/RecipeList'
// styles
import './Home.css'

export default function Home() {
  const { mode } = useContext(ThemeContext)  // to style dark mode

  // // when using json-server, fetch the data with the line below
  // const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')

  // when using firebase
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  // // without real-time data
  // useEffect(() => {
  //   setIsPending(true)
  //   getDocs(collection(db, 'recipes'))
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         setError("No recipes to load")
  //         setIsPending(false)
  //       } else {
  //         // console.log(snapshot.docs[0].data());
  //         let results = []
  //         snapshot.docs.forEach(doc => {
  //           results.push({ id: doc.id, ...doc.data() })
  //         })
  //         setRecipes(results)
  //         setIsPending(false)
  //       }
  //     })
  // }, [])

  // with real-time
  let ref = collection(db, 'recipes')
  useEffect(() => {
    setIsPending(true)
    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError(`No recipes to load.`)
        setIsPending(false)
      } else {
        // console.log(snapshot.docs[0].data());
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setIsPending(false)
      }
    })

    return () => unsub()
  }, [ref])


  return (
    <div className='home'>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className='loading'>Loading.........</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
