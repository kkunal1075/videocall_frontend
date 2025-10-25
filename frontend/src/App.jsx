import logo from './assets/react.svg';
import  './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import VideoMeetComponent  from './pages/VideoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history';


function App() {
  return (
    <div className="App">
      <Router>


        <AuthProvider>

          <Routes>
         
            <Route path="/" element={<LandingPage/>} />

            <Route path="/auth" element={<Authentication/>} />
              
            <Route path="/login" element={<Login/>} />
              
            <Route path="/signup" element={<Signup/>} />

            
             <Route path="/home" element={<HomeComponent />} />
             
             <Route path='/history' element={<History />} />

             <Route path='/:url' element={<VideoMeetComponent/>} />

           


       
          </Routes>
        </AuthProvider>
     </Router>
    </div>
  );
}

export default App;