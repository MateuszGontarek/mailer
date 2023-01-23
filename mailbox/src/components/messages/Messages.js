import React from 'react'
import './Messages.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const Messages = () => {
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()


    const deleteMessage = async (id) => {
      const response = await axios.delete(`/api/delete-message/${id}`)
      setMessages(messages.filter((message) => message._id !== id))
      NotificationManager.info('Wiadomość usunięta')
    }
    

    const readMessage = async (id) => {
      const response = await axios.put(`/api/read-message/${id}`).catch(() => {
        NotificationManager.error('Wystąpił błąd')
      })
      setMessages(messages.map((message) => {
        if (message._id === id) {
          message.read = true
        }
        return message
      }))
      NotificationManager.success('Wiadomość oznaczona jako przeczytana')
    }


    useEffect(() => {
      const getMessages = async () => {
        const response = await axios.post('/api/get-messages', {"email": sessionStorage.getItem('email')}).catch(() => {
          NotificationManager.error('Wystąpił błąd')
        })

        setMessages(response.data)
      }
      if (sessionStorage.getItem('token')) { getMessages() }
      else { navigate('/') }
    }, [])

    return (
      <div className="messages">
        <div className='sent'>
          <h2>Wysłane</h2>
          {console.log(messages)}
          {messages.filter((message) => message.sender === sessionStorage.getItem('email')).map((message, index) => (
            <div className="message" key={index}>
              <p className="tile">{message.title}</p>
              <p className="recivier">{message.receiver}</p>
              <p className="content">{message.content}</p>
              <button className="delete" onClick={() => deleteMessage(message._id)}>Usuń wiadomość</button>
              <p className='read'>{message.read ? "przeczytana" : "nie przeczytana"}</p>
            </div>
          ))}
        </div>
        <div className="receiver">
          <h2>Odebrane</h2>
          {messages.filter((message) => message.receiver === sessionStorage.getItem('email')).map((message, index) => (
            <div className="message" key={index}>
              <p className="title">{message.title}</p>
              <p className="sender">{message.sender}</p>
              <p className="content">{message.content}</p>
              <button className="delete"onClick={() => deleteMessage(message._id)}>Usuń wiadomość</button>
              {!message.read 
              ? <button onClick={() => readMessage(message._id)} className="read readbtn">Oznacz jako przeczytane</button>
              : <p className='read'>Przeczytana</p>}
            </div>
          ))}
        </div>      
        <Link to={'/send'} className="send">Wyślij wiadomość</Link>
      </div>
    )
}
export default Messages;