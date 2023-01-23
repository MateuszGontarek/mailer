import './Dashboard.scss'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate();
    const surnameRef = React.createRef();
    const passwordRef = React.createRef();
    const emailRef = React.createRef();
    const nameRef = React.createRef();
    const [Users, setUsers] = useState([]);
    const [Error, setError] = useState({
        display: 'none'
    });

    const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return false
        return true
    }

    const addEmailHandler = async (e) => {
        setError({
            display: "none"
       })
        e.preventDefault();
        const name = nameRef.current.value,
              surname = surnameRef.current.value,
              email = emailRef.current.value,
              password = passwordRef.current.value;
        
        if(name.leght < 5 ||
           surname.leght < 5 ||
           password.leght < 5 ||
           ValidateEmail(email)) {
            console.log('error');
            setError({
                display: "block"
           })
            return; 
        }

        const data = {name, surname, email, password};
        const response = await axios.post('/api/user', data).catch((err) => {
            console.log('Error: ', err);
            setError({
                display: "block"
           })
        });
        setUsers([...Users, data]);
    }

    const deleteUser = async (user) => {
        const response = await axios.delete('/api/user', user);
        setUsers(Users.filter((u) => u !== user));
    }

    useEffect(() => {
        const fetchUsers = async () => {
            if (sessionStorage.getItem('role') === 'admin') {
                const response = await axios.get('/api/user');
                
                setUsers(response.data.users);
            } else {
                navigate('/loginAdmin')
            }
        }
        fetchUsers();
    }, [])

    return (
        <div>     
            <div className='form'>
                <h1>Dashboard</h1>
                <input ref={nameRef} type="text" placeholder="name" />
                <input ref={surnameRef} type="text" placeholder="surname"/>
                <input ref={emailRef} type="text" placeholder="email"/>
                <input ref={passwordRef} type="text" placeholder="password"/>
                <button onClick={addEmailHandler} type="submit">Dodaj</button>
            </div>
            <div className="error" style={Error}>
                <p>Error</p>
            </div>
            <div className='table'>
                <h1>Lista Użytkowników</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Nazwisko</td>
                            <td>Imię</td>
                            <td>Email</td>
                            <td>Hasło</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button onClick={() => deleteUser(user)}>Usuń</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Dashboard