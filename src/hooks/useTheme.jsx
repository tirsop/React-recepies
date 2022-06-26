//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// I am not using this hook. to use it, check lesson 97
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Eror("useTheme() must be used inside a ThemeProvided")
  }

  return context
}