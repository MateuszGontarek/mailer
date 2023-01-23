import './App.css';
import {Login, Dashboard} from './components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="loginAdmin" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
