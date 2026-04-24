import { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import "./TeacherDashboard.css";

function TeacherDashboard(props) {

    let obj = props.data;

    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    const [show, setShow] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newMarks, setNewMarks] = useState("");

    const [showPassModal, setShowPassModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (!obj?.t_subject || !selectedClass) {
            setStudents([]);
            return;
        }

        fetch(`http://localhost:8080/teacher/filter?std_class=${selectedClass}&subject=${obj.t_subject}`)
            .then(res => res.json())
            .then(data => {

                let formatted = [];

                data.forEach(std => {
                    let subjects = std.subject?.subjects || [];

                    subjects.forEach(sub => {
                        if (sub.sub_name === obj.t_subject) {
                            formatted.push({
                                id: std.std_id,
                                name: std.std_name,
                                class: std.std_class,
                                marks: sub.sub_marks
                            });
                        }
                    });
                });

                setStudents(formatted);
            });

    }, [obj, selectedClass]);

    const handleShow = (student) => {
        setSelectedStudent(student);
        setNewMarks(student.marks);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedStudent(null);
        setNewMarks("");
    };

    const handleUpdate = async () => {

        if (newMarks < 0 || newMarks > 100) {
            alert("Marks must be between 0 and 100");
            return;
        }

        await fetch(`http://localhost:8080/teacher/updateMarks/${obj.t_subject}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                std_id: selectedStudent.id,
                subject: {
                    subjects: [{
                        sub_name: obj.t_subject,
                        sub_marks: Number(newMarks)
                    }]
                }
            })
        });

        setStudents(students.map(s =>
            s.id === selectedStudent.id ? { ...s, marks: Number(newMarks) } : s
        ));

        handleClose();
    };

    const handlePasswordUpdate = async () => {

        if (newPassword.length < 4) {
            alert("Password must be at least 4 characters");
            return;
        }

        await fetch("http://localhost:8080/teacher/updatePassword", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                t_id: obj.t_id,
                t_password: newPassword
            })
        });

        alert("Password updated");
        setShowPassModal(false);
        setNewPassword("");
    };

    return (
        <div className="teacher-dashboard container-fluid">

            <div className="teacher-header">
                <div>
                    <h2>Welcome, {obj?.t_name} </h2>
                    <p>{obj?.t_email} | Subject: {obj?.t_subject}</p>
                </div>

                <div>
                    <Button variant="secondary" className="me-2" onClick={() => setShowPassModal(true)}>Update Password</Button>
                    <Button variant="danger" onClick={props.onLogout}>Logout</Button>
                </div>
            </div>

            <Row className="g-4 mt-3 w-100 m-0">

                <Col md={4}>
                    <Card className="teacher-card">
                        <Card.Body>
                            <h5>Subject</h5>
                            <h3>{obj?.t_subject}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="teacher-card">
                        <Card.Body>
                            <h5>Salary</h5>
                            <h3>₹{obj?.t_salary}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="teacher-card">
                        <Card.Body>
                            <h5>Teacher ID</h5>
                            <h3>{obj?.t_id}</h3>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className="mt-3 w-100 m-0">
                <Col md={4}>
                    <Card className="teacher-card p-3">
                        <h5>Select Class</h5>
                        <Form.Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="">-- Select Class --</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                            <option value="3">Class 3</option>
                            <option value="4">Class 4</option>
                            <option value="5">Class 5</option>
                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                        </Form.Select>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4 w-100 m-0">
                <Col md={12}>
                    <Card className="teacher-card">
                        <Card.Body>
                            <h5>Filtered Students</h5>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Marks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        students.length > 0 ? (
                                            students.map((s, index) => (
                                                <tr key={s.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{s.name}</td>
                                                    <td>{s.class}</td>
                                                    <td>{s.marks}</td>
                                                    <td><Button variant="warning" size="sm" onClick={() => handleShow(s)}>Update</Button></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Select class to view students</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Marks</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control type="text" value={selectedStudent?.name || ""} disabled/>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control type="number" value={newMarks} onChange={(e) => setNewMarks(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="success" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPassModal} onHide={() => setShowPassModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPassModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handlePasswordUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default TeacherDashboard;