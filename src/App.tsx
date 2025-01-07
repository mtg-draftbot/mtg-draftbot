// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation.tsx"; 
// <---- PAGES ----> 
import About from "./pages/About.tsx"
import DraftInterface from "./pages/DraftInterface.tsx"
import LandingPage from "./pages/LandingPage.tsx"
import CardVault from "./pages/CardVault.tsx"



function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
          <Routes>
            <Route path="/" element={< LandingPage/>} />
            <Route path="/draft" element={< DraftInterface/>} />
            <Route path="/about" element={< About/>} />
            <Route path="/vault" element={< CardVault/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App 