import { Route,Routes } from 'react-router-dom'
import Home from './features/auth/pages/Homepage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
