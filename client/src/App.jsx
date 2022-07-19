
import {BrowserRouter, Route, Switch} from "react-router-dom"
import books from "./components/books/books"
import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import { Route } from "react-router-dom";


function App() {
  return (  
  <React.Fragment>
    <switch>
    <Route exact path="/" />
    <Route exact path="/books" component={books}/>
    <Route exact path="/:id"/>
    <Route exact path="/register"/>
    <Route exact path="/login"/>
    <Route exact path="/us" component={AboutUs}/>
    </switch>
   </React.Fragment>
  )
}


export default App

