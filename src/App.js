// work left in this project
// 1. working Chatbox
// 2. last seen working
// 3. profile pic upload
// 4. stories work
// 5. add about section in profile section

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homepageuser from './components/Homepageuser';
import Chatbox from './components/Chatbox';
import StoriesPage from './components/Storiespage';
import LoginSignup from './components/Loginsignup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Allusers from './components/Allusers';
import Friends from './components/Friends';
import Profile from './components/Profile';


function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/stories" element={<StoriesPage />} />
          <Route exact path="/loginsignup" element={<LoginSignup />} />
          <Route exact path="/allusers" element={<Allusers />} />
          <Route exact path="/friends" element={<Friends />} />
          <Route exact path="/chat" element={<Chatbox />} />
          <Route exact path="/profile" element={<Profile />} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
