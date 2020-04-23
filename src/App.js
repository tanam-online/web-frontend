import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import './App.css';
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import ManageLand from "./Components/ManageLand"
import CreateLand from "./Components/CreateLand"
import Monitoring from "./Components/Monitoring"
/* 
import Prediction from "./Components/Prediction"
import Recommendation from "./Components/Recommendation"
import Account from "./Components/Account" */
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import NotFound from "./Components/NotFound"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Box my={12.5}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/manage-land">
                <ManageLand />
              </Route>
              <Route exact path="/manage-land/create-land">
                <CreateLand />
              </Route>
              <Route path="/monitoring">
                <Monitoring />
              </Route>
              {/* 
              <Route path="/prediction">
                <Prediction />
              </Route>
              <Route path="/recommendation">
                <Recommendation />
              </Route>
              <Route path="/account">
                <Account />
              </Route> */}
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
