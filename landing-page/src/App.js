import './App.css';
import { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
function App() {
  const [usersAmount, setUsersAmount] = useState([]);
  const [emailsAmount, setEmailsAmount] = useState([]);
  const [mostActiveUser, setMostActiveUser] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.post('/api/user-amount');
      const response2 = await axios.post('/api/email-amount');
      const response3 = await axios.post('/api/user-most-active');
      setUsersAmount(response.data.lenght);
      setEmailsAmount(response2.data.lenght);
      setMostActiveUser(response3.data.mostActiveUser);
    };
    getData();
  }, []);

  return (
    <div className="landing-page">
      <h1>Strona główna</h1>
      <p>Liczba użytkowników: {usersAmount}</p>
      <p>Liczba email-i: {emailsAmount}</p>
      <p>Najaktywniejszy uzytkownik: {mostActiveUser}</p>
      <Router>
        <Link className="link" to="/login">Zaloguj się</Link>
        <Link className="link" to="/admin">Panel administratora</Link>
      </Router>
    </div>
  );
}

export default App;
