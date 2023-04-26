import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import Swal from 'sweetalert2'

const Login = () => {
    const { state, dispatch } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const [dataForBackend, setDataForBackend] = useState({
        phone: '',
        password: '',
    }) 

    const navigate = useNavigate()

    useEffect(() => {
        if (state.token) {
            navigate('/', { replace: true })
        }
    }, [])

    function login(e) {
        e.preventDefault()
        setLoading(true)
        axios.post('https://todo.paydali.uz/api/login', dataForBackend)
         .then((res) => {
            console.log(res.data)
            Swal.fire({
                title: 'Authenicated successful!',
                icon: 'success',
            })
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: res.data.payload,
                    token: res.data.payload.token,
                },
            })
            localStorage.setItem('token', res.data.payload.token)
            navigate('/', { replace: true })
         })
         .catch((err) => {
            Swal.fire({
                title: 'Phone number or password incorrect!',
                icon: 'error'
            })
         })
         .finally(() => setLoading(false))
    }
  return (
    <div className='auth-container'>
        <form action="#" className='auth-form' onSubmit={login}>
            <h1>Login</h1>
            <input onChange={e => setDataForBackend({ ...dataForBackend, phone: e.target.value })} value={dataForBackend.phone} type="number" placeholder='Enter your phone number' required />
            <input onChange={e => setDataForBackend({ ...dataForBackend, password: e.target.value })} type="password" placeholder='Password' required />
            <button disabled={loading}>Login</button>
        </form>
    </div>
  )
}

export default Login