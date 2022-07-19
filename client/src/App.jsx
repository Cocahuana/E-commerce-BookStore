import {BrowserRouter, Route, Switch} from "react-router-dom"
import books from "./components/books/books"
import './App.css'
import { Button } from '@chakra-ui/react';

function App() {
  return (  
    <switch>
    <Route exact path="/" />
    <Route exact path="/books" component={books}/>
    <Route exact path="/:id"/>
    <Route exact path="/register"/>
    <Route exact path="/login"/>
    <Route exact path="/us"/>
    </switch>      
  )
}


export default App

