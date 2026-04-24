import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./AdminDashboard.css";
import StudentSectionPage from "./pages/StudentSectionPage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";


function AdminDashboard({ data, onLogout }) {

    const [page, setPage] = useState("dashboard");

    if (page === "sections") {
        return <StudentSectionPage goBack={() => setPage("dashboard")} />;
    }

    if (page === "students") {
        return <StudentPage goBack={() => setPage("dashboard")} />;
    }

    if (page === "teachers") {
        return <TeacherPage goBack={() => setPage("dashboard")} />;
    }

    return (
        <div className="admin-container container-fluid">

            <div className="admin-header">
                <div>
                    <h2>Welcome, {data?.admin_name}</h2>
                    <p>{data?.admin_email}</p>
                </div>

                <div>
                    <Button variant="danger" onClick={onLogout}>Logout</Button>
                </div>
            </div>

            <Row className="g-4 mt-3 w-100 m-0">

                <Col md={4}>
                    <Card className="admin-card text-center">
                        <Card.Body>
                            <h5>Manage Student Sections</h5>
                            <Button onClick={() => setPage("sections")}>Go to Student Sections</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="admin-card text-center">
                        <Card.Body>
                            <h5>Manage Students</h5>
                            <Button onClick={() => setPage("students")}>Go to Students</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="admin-card text-center">
                        <Card.Body>
                            <h5>Manage Teachers</h5>
                            <Button onClick={() => setPage("teachers")}>Go to Teachers</Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className="mt-4 w-100 m-0">

                <Col md={6}>
                    <Card className="admin-card">
                        <Card.Body>
                            <h5>Admin Info</h5>
                            <p><strong>ID:</strong> {data?.admin_id}</p>
                            <p><strong>Name:</strong> {data?.admin_name}</p>
                            <p><strong>Email:</strong> {data?.admin_email}</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="admin-card">
                        <Card.Body>
                            <h5>System Overview</h5>
                            <p>✔ Manage Students</p>
                            <p>✔ Manage Teachers</p>
                            <p>✔ Manage Sections</p>
                            <p>✔ Full Control Access</p>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        </div>
    )
}
export default AdminDashboard;