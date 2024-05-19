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

  // change mode
  const [mode, setMode] = useState("light");

  const toggleMode = (cls) => {
    document.body.classList.add("bg-" + cls);
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(14, 14, 14)";
      document.body.style.color = "white";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
              <Route path="/about" exact element={<About mode={mode} toggleMode={toggleMode} />} />
              <Route path="/login" exact element={<Login showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
              <Route path="/signup" exact element={<Signup showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
