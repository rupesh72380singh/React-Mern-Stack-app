
import './App.css';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import About from "./components/About"
import NoteState from './context/notes/NoteState';
import NoteItem from './components/NoteItem';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert message= "this is amazing course"/>
    <div className="container">
    <Routes>
          <Route path="/About" element ={<About/>}></Route>
          <Route path="/Home" element = {<Home/>}></Route>
          <Route path="/Login" element = {<Login/>}></Route>
          <Route path="/Signup" element = {<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
