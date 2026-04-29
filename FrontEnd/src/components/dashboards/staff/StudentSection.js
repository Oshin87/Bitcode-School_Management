import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "./StudentSection.css";
import StudentPageSS from "./pages/StudentPageSS";
import TeacherPageSS from "./pages/TeacherPageSS";

function StudentSectionDashboard({ data, onLogout }) {

    const [page, setPage] = useState("dashboard");
    const [showPass, setShowPass] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    if (page === "students") {
        return <StudentPageSS goBack={() => setPage("dashboard")} />;
    }

    if (page === "teachers") {
        return <TeacherPageSS goBack={() => setPage("dashboard")} />;
    }

    async function changePassword() {
        if (!newPassword) {
            alert("Please enter password");
            return;
        }

        let payload = {
            sec_id: data?.sec_id,
            sec_password: newPassword
        };

        try {
            let res = await fetch("http://localhost:8080/studentSection/updatePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowPass(false);
                setNewPassword("");
            } else {
                let err = await res.text();
                console.log("Backend Error:", err);
                alert("Failed to update password");
            }

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    }

    return (
        <div className="section-container container-fluid">
            <div className="section-header">
                <div>
                    <h2>Welcome, {data?.sec_name}</h2>
                    <p>{data?.sec_email}</p>
                </div>

                <div className="d-flex gap-2">
                    <Button variant="warning" onClick={() => setShowPass(true)}>Change Passwor</Button>
                    <Button variant="danger" onClick={onLogout}>Logout</Button>
                </div>
            </div>

            <Row className="g-4 mt-3 w-100 m-0">
                <Col md={6}>
                    <Card className="section-card text-center">
                        <Card.Body>
                            <h5>Manage Students</h5>
                            <p>View and manage student records</p>
                            <Button variant="primary" onClick={() => setPage("students")}>Go to Students</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="section-card text-center">
                        <Card.Body>
                            <h5>Manage Teachers</h5>
                            <p>View teacher details and information</p>
                            <Button variant="primary" onClick={() => setPage("teachers")}>Go to Teachers</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4 w-100 m-0">
                <Col md={6}>
                    <Card className="section-card">
                        <Card.Body>
                            <h5>Section Info</h5>
                            <p><strong>ID:</strong> {data?.sec_id}</p>
                            <p><strong>Name:</strong> {data?.sec_name}</p>
                            <p><strong>Email:</strong> {data?.sec_email}</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="section-card">
                        <Card.Body>
                            <h5>Access Overview</h5>
                            <p>✔ Manage Students</p>
                            <p>✔ View Teachers</p>
                            <p>✔ Section Level Access</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showPass} onHide={() => setShowPass(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPass(false)}>Cancel</Button>
                    <Button variant="success" onClick={changePassword}>Update Password</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default StudentSectionDashboard;