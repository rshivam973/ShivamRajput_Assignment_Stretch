import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Profilecard from './components/Profilecard';
import Home from './pages/Home';
import Login from './pages/Login';
import { usersData } from './utils/dummyData';
import Signup from './pages/Signup';
import EditProfile from './pages/EditProfile';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/editprofile" element={<EditProfile/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
