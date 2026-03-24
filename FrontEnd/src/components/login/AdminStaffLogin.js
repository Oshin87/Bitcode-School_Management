import { useState } from "react";
import { Form, Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./AdminStaffLogin.css";

function AdminStaffLogin() {

    const [role, setRole] = useState("ADMIN");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    function funLogin(e) {
        e.preventDefault();

        console.log("Role:", role);
        console.log("ID:", id);
        console.log("Password:", password);

        // API
    }

    return (
        <div className="admin-login-container">

            <Card className="admin-login-card shadow-lg">
                <Card.Body>

                    <h2 className="text-center mb-4">
                        {role === "ADMIN" ? "Admin Login" : "Staff Login"}
                    </h2>

                    <div className="text-center mb-4">
                        <ToggleButtonGroup type="radio" name="role" value={role} onChange={(val) => setRole(val)}>
                            <ToggleButton id="admin-btn" value="ADMIN" variant="outline-dark">Admin</ToggleButton>
                            <ToggleButton id="staff-btn" value="STUDENTSECTION" variant="outline-dark">Staff</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <Form onSubmit={funLogin}>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter Your ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" className="admin-login-button">Login</Button>
                        </div>

                        <div>
                            <p>Student / Teacher Login ? <a href="/login">Click Here</a></p>
                        </div>

                    </Form>

                </Card.Body>
            </Card>

        </div>
    )
}
export default AdminStaffLogin;