import './Login.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginFn = async (e) => {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
            
        }

        const response = await axios.post('/api/login', data);
        console.log(response);
        if (response.data.success) {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('role', response.data.role)
            navigate('/dashboard');
        }
    };
    return (
        <div className="login">
            <div className="login__container">
                <h1>Zaloguj się</h1>
                <input ref={emailRef} type="email" placeholder="Email" className="login__input"/>
                <input ref={passwordRef} type="password" placeholder="Password" className="login__input"/>
                <button type="submit" className="login__button" onClick={loginFn}>Zaloguj się</button>
            </div>
        </div>
    )
}
export default Login