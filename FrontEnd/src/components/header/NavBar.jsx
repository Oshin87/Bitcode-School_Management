import { Link } from "react-router-dom";
import './navbar.css'

function NavBar() {

  return (
    <>
    <nav className="navbar">
      <div className="logo">ABC Public School</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/addmission">Admission</Link></li>
        <li><Link to="/transport">Transport</Link></li>
        <li>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
    </>
  )
}
export default NavBar;