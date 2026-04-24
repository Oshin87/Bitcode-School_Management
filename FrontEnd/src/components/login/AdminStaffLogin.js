import { useState } from "react";
import { Form, Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./AdminStaffLogin.css";

import AdminDashboard from "../dashboards/admin/AdminDashboard";
import StudentSection from "../dashboards/staff/StudentSection";

function AdminStaffLogin() {

    const [role, setRole] = useState("ADMIN");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [adminLogin, setAdminLogin] = useState(false);
    const [staffLogin, setStaffLogin] = useState(false);
    const [obj, setObj] = useState();

    async function funLogin(e) {
        e.preventDefault();

        console.log("Role:", role);

        try {

            if (role === "ADMIN") {
                let request = await fetch("http://localhost:8080/admin/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        admin_email: email,
                        admin_password: password
                    })
                });

                if (request.ok) {
                    let response = await request.json();
                    console.log("Admin Login Success :", response);

                    setObj(response);
                    setAdminLogin(true);

                } else {
                    let error = await request.text();
                    console.log("Login Failed:", error);
                    alert("Invalid Admin Credentials!");
                }
            }

            else if (role === "STUDENTSECTION") {
                let request = await fetch("http://localhost:8080/studentSection/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sec_email: email,
                        sec_password: password
                    })
                });

                if (request.ok) {
                    let response = await request.json();
                    console.log("Staff Login Success:", response);

                    setObj(response);
                    setStaffLogin(true);

                } else {
                    let error = await request.text();
                    console.log("Login Failed:", error);
                    alert("Invalid Staff Credentials!");
                }
            }

        } catch (err) {
            console.error(err);
            alert("Server Error!");
        }
    }

    return (
        <div className="admin-login-container">

            {
                !adminLogin && !staffLogin && (
                    <Card className="admin-login-card shadow-lg">
                        <Card.Body>

                            <h2 className="text-center mb-4">{role === "ADMIN" ? "Admin Login" : "Staff Login"}</h2>

                            <div className="text-center mb-4">
                                <ToggleButtonGroup type="radio" name="role" value={role}>
                                    <ToggleButton value="ADMIN" variant="outline-dark" onClick={() => setRole("ADMIN")}>Admin</ToggleButton>
                                    <ToggleButton value="STUDENTSECTION" variant="outline-dark" onClick={() => setRole("STUDENTSECTION")}>Staff</ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <Form onSubmit={funLogin}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Email</Form.Label>
                                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" className="admin-login-button">Login</Button>
                                </div>

                                <div className="mt-3">
                                    <p>Student / Teacher Login ?{" "}<a href="/login">Click Here</a></p>
                                </div>

                            </Form>

                        </Card.Body>
                    </Card>
                )
            }

            {
                adminLogin ? (
                    <AdminDashboard data={obj} onLogout={() => {setAdminLogin(false);setStaffLogin(false);setObj(null);setEmail("");setPassword("");}}/>
                ) : staffLogin ? (
                    <StudentSection data={obj} onLogout={() => {setStaffLogin(false); setAdminLogin(false); setObj(null); setEmail(""); setPassword("");}}/>
                ) : null
            }

        </div>
    )
}
export default AdminStaffLogin;