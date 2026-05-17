import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {

    return (
        <footer className="footer">

            <div className="footer-inner">

                <div className="footer-section">
                    <h3>OSHIN SCHOOL</h3>

                    <p>
                        OSHIN SCHOOL is dedicated to providing quality education,
                        discipline, and overall student development for a brighter future.
                    </p>
                </div>

                <div className="footer-section">

                    <h4>Quick Links</h4>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/admission">Admission</Link></li>
                        <li><Link to="/achievements">Achievements</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>

                </div>

                <div className="footer-section">

                    <h4>Contact Us</h4>

                    <p>📍 Chandrapur, Maharashtra</p>
                    <p>📞 +91 9876543210</p>
                    <p>✉️ oshinschool@gmail.com</p>

                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} OSHIN SCHOOL | All Rights Reserved
            </div>

        </footer>
    )
}

export default Footer;