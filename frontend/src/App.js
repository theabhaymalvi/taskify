import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <Router>
      <AuthProvider>
      <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </DndProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;