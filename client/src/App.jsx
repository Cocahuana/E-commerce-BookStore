import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import { Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <Route exact path="/us" component={AboutUs}/>
    </React.Fragment>
  )
}

export default App
