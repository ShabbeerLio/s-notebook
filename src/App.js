import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Components/Alert/Alert";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home showAlert={showAlert} />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/login" exact element={<Login showAlert={showAlert} />} />
              <Route path="/signup" exact element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
