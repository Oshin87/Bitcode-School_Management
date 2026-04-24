import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import StudentPageSS from "./pages/StudentPageSS";
import TeacherPageSS from "./pages/TeacherPageSS";

function StudentSection(props) {
  
  let obj = props.data;

  const [showPassModal, setShowPassModal] = useState(false);
  const [page, setPage] = useState("dashboard");

    if (page === "students") {
        return <StudentPageSS goBack={() => setPage("dashboard")} />;
    }

    if (page === "teachers") {
        return <TeacherPageSS goBack={() => setPage("dashboard")} />;
    }

  return (
    <div className="sec-container container-fluid">
      <div className="sec-header">
        <div>
          <h2>Welcome, {obj?.sec_name}</h2>
          <p>{obj?.sec_email} | Status : {obj?.sec_status}</p>
        </div>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => setShowPassModal(true)}>Update Password</Button>
          <Button variant="danger" onClick={props.onLogout}>Logout</Button>
        </div>
      </div>
      <Row className="g-4 mt-3 w-100 m-0">
        <Col md={4}>
          <Card className="sec-card text-center">
            <Card.Body>
              <h5>Manage Students</h5>
              <Button onClick={() => setPage("students")}>Go to Students</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sec-card text-center">
            <Card.Body>
              <h5>Manage Teachers</h5>
              <Button onClick={() => setPage("teachers")}>Go to Teachers</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default StudentSection;