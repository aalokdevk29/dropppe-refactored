import React from 'react'
import { Route, Routes } from 'react-router'
import { ShopApp } from './Screens/Home'
import NotFound from './Screens/NotFound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShopApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App