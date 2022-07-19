
import {BrowserRouter, Route, Switch} from "react-router-dom"
import React from "react"
import BookHolder from "./components/BookHolder/BookHolder"
import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"


function App() {
  return (  
  <React.Fragment>
    <Route path="/"  component={NavBar}/>
    <Route exact path="/" />
    <Route exact path="/books" component={BookHolder}/>
    <Route exact path="/:id"/>
    <Route exact path="/register"/>
    <Route exact path="/login"/>
    <Route exact path="/us" component={AboutUs}/>
    <Route path="/"  component={Footer}/>
   </React.Fragment>
  )
}


export default App

