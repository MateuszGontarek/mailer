import './App.css';
import { Messages, Send, Login } from './components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
const App = () => {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="*" element={<Login/>}/>
            <Route path="messages" element={<Messages/>}/>
            <Route path="send" element={<Send/>}/>
          </Routes>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
