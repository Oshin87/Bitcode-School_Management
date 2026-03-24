import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    
    return (
        <div className="header">
            <div>
                <h2 className="logo">OSHIN SCHOOL</h2>
            </div>

            <div className="nav-links">
                <h3><Link to="/">Home</Link></h3>
                <h3><Link to="/admission">Admission</Link></h3>
                <h3><Link to="/achievements">Achievements</Link></h3>

                <div className="login-btn">
                    <Button as={Link} to="/login" size="lg" variant="light">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Header;