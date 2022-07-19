
import {BrowserRouter, Route, Switch} from "react-router-dom"
import BookHolder from "./components/BookHolder/BookHolder"
import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import { Route } from "react-router-dom";


function App() {
  return (  
  <React.Fragment>
    <switch>
    <Route exact path="/" />
    <Route exact path="/books" component={BookHolder}/>
    <Route exact path="/:id"/>
    <Route exact path="/register"/>
    <Route exact path="/login"/>
    <Route exact path="/us" component={AboutUs}/>
    </switch>
   </React.Fragment>
  )
}


export default App

