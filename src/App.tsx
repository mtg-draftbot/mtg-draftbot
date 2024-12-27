// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import CardDragDrop from './components/CardDragDrop.tsx' 
import Navigation from "./components/Navigation.tsx"; 



function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
          <Routes>
            <Route path="/" element={<p>hi</p>} />
            <Route path="/Draft" element={< CardDragDrop/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App 