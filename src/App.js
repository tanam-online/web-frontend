import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import './App.css';
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Detail from "./Components/Detail"
import Header from "./Components/Header"
import ProductList from "./Components/ProductList"
import Submission from "./Components/Submission"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Container>
            <Box my={12.5}>
              <Route exact path="/">
                <Submission />
              </Route>
              <Route path="/monitoring">
                <ProductList />
              </Route>
              <Route path="/prediction">
                <Detail />
              </Route>
            </Box>
          </Container>
        </Switch>
      </div>
    </Router>
  )
}

export default App
