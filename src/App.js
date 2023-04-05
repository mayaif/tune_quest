import SettingsPage from "./components/SettingsPage"
import HomePage from "./components/HomePage"
import { Route, Routes } from "react-router-dom"
import './App.css';



export default function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trivia" element={<SettingsPage />} />
    </Routes>
  )
}