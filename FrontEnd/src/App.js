import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/displayPages/Home';
import Addmission from './components/displayPages/Addmission';
import Achivements from './components/displayPages/Achivements';
import GenralLogin from './components/login/GenralLogin';
import AdminStaffLogin from './components/login/AdminStaffLogin';

function App() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/admission' Component={Addmission} />
          <Route path='/achievements' Component={Achivements} />
          <Route path='/login' Component={GenralLogin} />
          <Route path='/adminLogin' Component={AdminStaffLogin} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
