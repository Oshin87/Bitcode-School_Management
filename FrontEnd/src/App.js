import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/displayPages/Home';
import Addmission from './components/displayPages/Addmission';
import Achivements from './components/displayPages/Achivements';
import GenralLogin from './components/login/GenralLogin';
import AdminStaffLogin from './components/login/AdminStaffLogin';
import StudentDashboard from './components/dashboards/students/StudentDashboard';
import TeacherDashboard from './components/dashboards/teacher/TeacherDashboard';
import StudentSectionPage from './components/dashboards/admin/pages/StudentSectionPage';
import StudentPage from './components/dashboards/admin/pages/StudentPage';
import TeacherPage from './components/dashboards/admin/pages/TeacherPage';
import TeacherPageSS from './components/dashboards/staff/pages/TeacherPageSS';
import StudentPageSS from './components/dashboards/staff/pages/StudentPageSS';

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
          <Route path='/studentDashboard' Component={StudentDashboard} />
          <Route path='/teacherDashboard' Component={TeacherDashboard} />
          <Route path='/studentSectionPage' Component={StudentSectionPage} />
          <Route path='/studentPage' Component={StudentPage} />
          <Route path='/teacherPage' Component={TeacherPage} />
          <Route path='/studentSection/teacherPage' Component={TeacherPageSS} />
          <Route path='/studentSection/StudentPage' Component={StudentPageSS} />          
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
