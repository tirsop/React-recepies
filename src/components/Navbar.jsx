import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

// components
import Searchbar from './Searchbar'
// styles
import './Navbar.css'


export default function Navbar() {
  const { color } = useContext(ThemeContext)

  return (
    <div className='navbar' style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className='brand'><h1>Spanish food recipes</h1></Link>
        {/* <Searchbar /> */}
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div >
  )
}
