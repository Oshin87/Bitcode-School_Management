import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "./StudentSectionPage.css";

function StudentPage(props) {

  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [student, setStudent] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const subjects = selectedStudent?.subject?.subjects || [];

  async function getStudents() {
    if (!stdClass) return;
    let res = await fetch(`http://localhost:8080/admin/allStudent?std_class=${stdClass}`);
    let data = await res.json();
    setArr(data);
  }

  useEffect(() => {
    getStudents();
  }, [stdClass]);

  const filteredArr = arr.filter((x) =>
    x.std_name?.toLowerCase().includes(search.toLowerCase())
  );

  function openEdit(obj) {
    setStudent({
      ...obj,
      status: obj.status || "ACTIVE"
    });
    setShowEdit(true);
  }

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function updateStudent() {
    let newStd = {
      ...student,
      std_class: Number(student.std_class),
      std_fees: Number(student.std_fees),
      status: student.status || "ACTIVE"
    };

    let response = await fetch("http://localhost:8080/admin/updateStudent", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStd)
    });
    console.log(response);
    setShowEdit(false);
    getStudents();
  }

  async function deleteStudent(obj) {
    await fetch(`http://localhost:8080/admin/deleteStudent?id=${obj.std_id}`,{ method: "DELETE" });
    getStudents();
  }

  function openScore(s) {
    setSelectedStudent(s);
    setShowScore(true);
  }

  return (
    <div className="section-dashboard container-fluid">

      <div className="section-header">
        <div>
          <h2>Student Management</h2>
          <p>Manage all students easily</p>
        </div>

        <Button variant="light" onClick={props.goBack}>Back</Button>
      </div>

      <Row className="mt-3">
        <Col md={3}>
          <Form.Select onChange={(e) => setStdClass(e.target.value)}>
            <option value="">Select Class</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Control placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </Col>
      </Row>

      <Row className="mt-4 w-100 m-0">
        <Col md={12}>
          <Card className="section-card">
            <Card.Body>
              <h5 className="mb-3">All Students</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Fees</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    filteredArr.length > 0 ? (
                      filteredArr.map((x, i) => (
                        <tr key={i}>
                          <td>{x.std_id}</td>
                          <td>{x.std_name}</td>
                          <td>{x.std_class}</td>
                          <td>{x.std_email}</td>
                          <td>{x.std_gender}</td>
                          <td>{x.std_phoneno}</td>
                          <td>₹ {x.std_fees}</td>
                          <td><Button size="sm" variant="info" onClick={() => openScore(x)}>View</Button></td>
                          <td><span className={(x.status || "ACTIVE") === "ACTIVE"? "badge-active" : "badge-inactive"}>{x.status || "ACTIVE"}</span></td>
                          <td><Button size="sm" variant="warning" onClick={() => openEdit(x)}>Update</Button></td>
                          <td><Button size="sm" variant="danger" onClick={() => deleteStudent(x)}>Delete</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">No Students Found</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="std_name" value={student.std_name || ""} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="std_email" value={student.std_email || ""} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="std_phoneno" value={student.std_phoneno || ""} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control name="std_city" value={student.std_city || ""} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Fees</Form.Label>
              <Form.Control name="std_fees" value={student.std_fees || ""} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="std_gender" value={student.std_gender || ""} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={student.status || ""} onChange={handleChange}>
                <option value="">Select</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control name="std_password" value={student.std_password || ""} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="success" onClick={updateStudent}>Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showScore} onHide={() => setShowScore(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Student Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          {
            subjects.length > 0 ? (
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    subjects.map((sub, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{sub.sub_name}</td>
                        <td>{sub.sub_marks}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            ) : (
              <p>No Marks Available</p>
            )
          }
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default StudentPage;