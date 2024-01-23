import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Sidebar from './components/Sidebar';
import Notestate from './components/Context/notes/Notestate';

function App() {

  return (
    <>
        <Notestate>
      <Router>
        <Navbar />
        <Sidebar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
      </Notestate>
    </>
  );
}

export default App;
