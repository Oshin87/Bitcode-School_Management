import { useState } from "react";
import { Form, Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./GenralLogin.css";

function GenralLogin() {

    const [role, setRole] = useState("STUDENT");
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
        <div className="login-container">

            <Card className="login-card shadow-lg">
                <Card.Body>

                    <h2 className="text-center mb-4">
                        {role === "STUDENT" ? "Student Login" : "Teacher Login"}
                    </h2>

                    <div className="text-center mb-4">
                        <ToggleButtonGroup type="radio" name="role" value={role} onChange={(val) => setRole(val)}>
                            <ToggleButton id="student-btn" value="STUDENT" variant="outline-primary">Student</ToggleButton>
                            <ToggleButton id="teacher-btn" value="TEACHER" variant="outline-primary">Teacher</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <Form onSubmit={funLogin}>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter Your ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" className="login-button">Login</Button>
                        </div>

                        <div>
                            <p>Management Login ? <a href="/adminLogin">Click Here</a></p>
                        </div>

                    </Form>

                </Card.Body>
            </Card>

        </div>
    )
}
export default GenralLogin;