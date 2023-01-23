import React from 'react'
import './Send.scss'
import axios from 'axios'
import Select from "react-select";
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Send = () => {
    const navigate = useNavigate()
    const titleRef = React.useRef()
    const contentRef = React.useRef()
    const [email, setEmail] = React.useState([])
    const [selectedOption, setSelectedOption] = React.useState(null);

    
    const sendMessage = async () => {
        const message = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            sender: sessionStorage.getItem('email'),
            receiver: selectedOption,
        }
        const response = await axios.post('/api/messages', message).catch(() => {
            NotificationManager.error('Wystąpił błąd')
        })
        console.log(response)
        if (response.status === 200) {
            titleRef.current.value = ''
            contentRef.current.value = ''
            setSelectedOption(null)
            NotificationManager.success('Wiadomość została wysłana')
        }
    }

    const selectHandler = (data) => {
        if (!data) return;
        setSelectedOption(data.value);
       
    };

    useEffect(() => {
        const getEmail = async (req, res) => {
            const response = await axios.get('/api/user-email-get').catch(() => {
                NotificationManager.error('Wystąpił błąd')
              })

            setEmail(response.data.emails)
        }
        if (sessionStorage.getItem('token')){ getEmail() } 
        else { navigate('/') }
    }, [])

    return (
      <div className="send">
        <div className='form'>
            <h1>Wyślij wiadomość</h1>
            <input type="text" ref={titleRef} className="title"placeholder='Tytuł'/>
            <Select type="text" onChange={(data) => selectHandler(data)} className="receiver" placeholder='Odbiorca' options={email}/>
            <textarea ref={contentRef} className="content" placeholder='Treść wiadomości'/>`
            <input type="submit" className="send" onClick={sendMessage} placeholder="Wyślij" />
        </div>
        <Link to={'/messages'} className="comeback">Wróć</Link>
      </div>
    )
}
export default Send