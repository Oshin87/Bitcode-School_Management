import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-section">
          <h3>ABC Public School</h3>
          <p>
            ABC Public School is committed to providing quality education,
            character building, and holistic development of students.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/addmission">Admission</Link></li>
            <li><Link to="/transport">Transport</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 Main Road, Chandrapur, Maharashtra</p>
          <p>📞 +91 9876543219</p>
          <p>✉️ abcschool@gmail.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ABC Public School. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;