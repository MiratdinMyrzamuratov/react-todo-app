import Login from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import { createContext, useReducer } from 'react'
import { authReducer, initialState } from './store/authReducer'

export const AuthContext = createContext()

function App() {
  const [ state, dispatch ] = useReducer(authReducer, initialState)
  return (
    <AuthContext.Provider value={{ state, dispatch }} className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} >
        </Route>
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
