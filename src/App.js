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

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/stories" element={<StoriesPage />} />
          <Route exact path="/loginsignup" element={<LoginSignup />} />
          <Route exact path="/allusers" element={<Allusers />} />
          <Route exact path="/chat" element={<Chatbox />} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
