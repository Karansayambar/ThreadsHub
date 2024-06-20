import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import { CategoryProvider } from './Context/CategoryContext'

function App() {

  return (
      <CategoryProvider>
       <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
        </Routes>
       </BrowserRouter>
      </CategoryProvider>
  )
}

export default App
