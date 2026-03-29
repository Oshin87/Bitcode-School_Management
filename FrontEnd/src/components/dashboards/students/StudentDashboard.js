import { Card, Row, Col, Table, ProgressBar, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard(props) {

    let obj = props.data;

    let subjects = obj?.subject?.subjects || [];

    let avg = subjects.length > 0 ? Math.round(subjects.reduce((sum, s) => sum + s.sub_marks, 0) / subjects.length) : 0;

    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");

    const handleClose = () => {
        setShow(false);
        setPassword("");
    };

    const handleShow = () => setShow(true);

    const updatePassword = async () => {
        try {
            let res = await fetch("http://localhost:8080/student/updatePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    std_id: obj.std_id,
                    std_password: password
                })
            });

            if (res.ok) {
                handleClose();
            } else {
                alert("Failed to update password ❌");
            }

        } catch (err) {
            console.error(err);
            alert("Error occurred ❌");
        }
    };

    return (
        <div className="dashboard-container container-fluid">

            <div className="dashboard-header">
                <div>
                    <h2>Welcome, {obj?.std_name}</h2>
                    <p>{obj?.std_email} | Class {obj?.std_class}</p>
                </div>

                <div>
                    <Button variant="primary" className="me-2" onClick={handleShow}>Update Password</Button>
                    <Button variant="danger" onClick={props.onLogout}>Logout</Button>
                </div>
            </div>

            <Row className="g-4 mt-3 w-100 m-0">

                <Col md={4}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <h5>Total Subjects</h5>
                            <h3>{subjects.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <h5>Average Marks</h5>
                            <h3>{avg}%</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <h5>Fees</h5>
                            <h3>₹{obj?.std_fees}</h3>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className="mt-4 w-100 m-0">

                <Col md={8}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <h5>Subject Performance</h5>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subjects.length > 0 ? (
                                            subjects.map((sub, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sub.sub_name}</td>
                                                    <td>{sub.sub_marks}</td>
                                                    <td>
                                                        <ProgressBar now={sub.sub_marks} label={`${sub.sub_marks}%`}/>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">No Subjects Available</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="dashboard-card">
                        <Card.Body>
                            <h5>Student Info</h5>
                            <p><strong>ID:</strong> {obj?.std_id}</p>
                            <p><strong>Name:</strong> {obj?.std_name}</p>
                            <p><strong>Email:</strong> {obj?.std_email}</p>
                            <p><strong>Class:</strong> {obj?.std_class}</p>
                            <p><strong>City:</strong> {obj?.std_city}</p>
                            <p><strong>Gender:</strong> {obj?.std_gender}</p>
                            <p><strong>Phone:</strong> {obj?.std_phoneno}</p>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="success" onClick={updatePassword}>Update</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default StudentDashboard;