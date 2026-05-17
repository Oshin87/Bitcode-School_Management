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
    <div className="app-container">

      <Header />

      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admission' element={<Addmission />} />
          <Route path='/achievements' element={<Achivements />} />
          <Route path='/login' element={<GenralLogin />} />
          <Route path='/adminLogin' element={<AdminStaffLogin />} />
          <Route path='/studentDashboard' element={<StudentDashboard />} />
          <Route path='/teacherDashboard' element={<TeacherDashboard />} />
          <Route path='/studentSectionPage' element={<StudentSectionPage />} />
          <Route path='/studentPage' element={<StudentPage />} />
          <Route path='/teacherPage' element={<TeacherPage />} />
          <Route path='/studentSection/teacherPage' element={<TeacherPageSS />} />
          <Route path='/studentSection/studentPage' element={<StudentPageSS />} />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App;