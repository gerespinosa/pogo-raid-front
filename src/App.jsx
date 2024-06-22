import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//PAGES
import MainPage from './assets/pages/MainPage/MainPage'
import ModalPage from './assets/pages/ModalPage/ModalPage'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/:name' element={<ModalPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
