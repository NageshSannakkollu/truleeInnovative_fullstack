import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from "react-toastify"
import LandingPage from './components/LandingPage'
import AddCandidate from './components/AddCandidate'

import "react-toastify/dist/ReactToastify.css"
const App = () => (
    <BrowserRouter>
    <ToastContainer position='top-center' autoClose={600} hideProgressBar={true} transition={Slide}/>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path='/add_candidate' element={<AddCandidate/>}/>
      </Routes>
    </BrowserRouter>
  )


export default App