import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import './App.css';
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Manage from "./Components/Manage"
import Land from "./Components/Land"
import CreateLand from "./Components/CreateLand"
import CreateHarvest from "./Components/CreateHarvest"
import CreateActivity from "./Components/CreateActivity"
import Monitoring from "./Components/Monitoring"
import Prediction from "./Components/Prediction"
import Recommendation from "./Components/Recommendation"
import Account from "./Components/Account"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import Recover from "./Components/Recover"
import ChangePassword from "./Components/ChangePassword"
import NotFound from "./Components/NotFound"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Box my={12.5}>
            <Switch>
              <Route component={Home} exact path="/" />
              <Route component={Manage} exact path="/manage" />
              <Route component={Land} path="/land/:landId" />
              <Route component={CreateLand} exact path="/manage/create-land" />
              <Route
                component={CreateHarvest}
                path="/manage/create-harvest/:landId"
              />
              <Route
                component={CreateActivity}
                path="/manage/create-activity/:landId"
              />
              <Route component={Monitoring} path="/monitoring" />
              <Route component={Prediction} path="/prediction" />
              <Route component={Recommendation} path="/recommendation" />
              <Route component={Account} path="/account" />
              <Route component={SignUp} exact path="/sign-up" />
              <Route component={Login} exact path="/login" />
              <Route component={Recover} exact path="/recover" />
              <Route
                component={ChangePassword}
                path="/change-password/:encId"
              />
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
