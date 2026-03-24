import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Addmission from "./components/addmission/Addmission";
import Transport from "./components/transport/Transport";
import Login from "./components/login/Login";
import Display from "./components/display/Display";

function App() {

  const [user, setUser] = useState({ userType: "", email: "" });

  return (
    <div className="app-container">
      <Header/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addmission" element={<Addmission />}/>
          <Route path="/transport" element={<Transport />}/>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/display" element={<Display user={user}/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;