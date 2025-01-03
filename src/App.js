import "./App.css";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/notes/NoteState";
import { Home } from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  Alert  from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);

  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              
              <Route exact path="/about">
                <About />
              </Route>
              
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
              
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
