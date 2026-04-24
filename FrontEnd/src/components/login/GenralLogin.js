import { useState } from "react";
import { Form, Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./GenralLogin.css";
import StudentDashboard from "../dashboards/students/StudentDashboard";
import TeacherDashboard from "../dashboards/teacher/TeacherDashboard";

function GenralLogin() {

    const [role, setRole] = useState("STUDENT");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentlogin, setStudentLogin] = useState(false);
    const [teacherlogin, setTeacherLogin] = useState(false);
    const [obj, setObj] = useState();

    async function funLogin(e) {
        
        e.preventDefault();
        console.log("Role:", role);
        console.log("ID:", email);
        console.log("Password:", password);

        if(role === "STUDENT"){
            let request = await fetch("http://localhost:8080/student/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    std_email:email,
                    std_password:password
                })
            });
            if (request.ok) {
                let response = await request.json();
                console.log("Login Success:", response);
                setObj(response);
                console.log(studentlogin);
                setStudentLogin(true);
            } else {
                let errorText = await request.text();
                console.log("Login Failed:", errorText);
                alert("Invalid Credentials! (OR) \nFor Help Contact Student Section");
            }
        }else{
            let request = await fetch("http://localhost:8080/teacher/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    t_email:email,
                    t_password:password
                })
            });
            if (request.ok) {
                let response = await request.json();
                console.log("Login Success:", response);
                setObj(response);
                setTeacherLogin(true);
            } else {
                let response = await request.text();
                console.log("Login Failed:", response);
                alert("Invalid Credentials!");
            }
        }
    }

    return (
        <div className="login-container">

            {
                !studentlogin && !teacherlogin && (
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
                                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                )
            }
            
            {
                studentlogin ? (
                    <StudentDashboard data={obj} onLogout={()=>{setStudentLogin(false);setObj(null);setEmail("");setPassword("");}}/>
                ) : teacherlogin ? (
                    <TeacherDashboard data={obj} onLogout={()=>{setTeacherLogin(false);setObj(null);setEmail("");setPassword("");}}/>
                ) : null
            }
        </div>
    )
}
export default GenralLogin;