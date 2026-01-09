import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GithubProfile from './components/githubProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GithubProfile />
    </>
  )
}

export default App
