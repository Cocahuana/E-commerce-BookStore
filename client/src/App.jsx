import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import books from "./components/Book/Book"
import AboutUs from './components/AboutUs/AboutUs'
import login from "./components/SignIN/SignIn"
import nav from "./components/NavBar/NavBar"
import footer from "./components/Footer/Footer"
import register from "./components/SignUP/SignUp"
import details from "./components/BookDetail/BookDetail"
import landing from "./components/Landing/LandingPage"
import './App.css'


function App() {
  return (
    <React.Fragment>
        <Route path="/" component={nav} />
        <Route exact path="/" component={landing} />
        <Route exact path="/books" component={books} />
        <Route exact path="/book/:id" component={details} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
        <Route exact path="/us" component={AboutUs} />
        <Route path="/" component={footer} />
    </React.Fragment>
  )
}


export default App

