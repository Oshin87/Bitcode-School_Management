import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";

function StudentPageSS(props) {

  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const subjects = selectedStudent?.subject?.subjects || [];

  const [student, setStudent] = useState({
    std_name: "",
    std_email: "",
    std_phoneno: "",
    std_city: "",
    std_class: "",
    std_gender: "",
    std_fees: "",
    std_password: "",
    status: "ACTIVE",
    subject: {
      subjects: []
    }
  });

  async function getStudents() {
    if (!stdClass) {
      setArr([]);
      return;
    }

    let res = await fetch(
      `http://localhost:8080/studentSection/getStudent?std_class=${stdClass}`
    );

    let data = await res.json();
    setArr(data);
  }

  useEffect(() => {
    getStudents();
  }, [stdClass]);

  const filteredArr = arr.filter((x) =>
    x.std_name?.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  function addSubject() {
    setStudent({
      ...student,
      subject: {
        subjects: [
          ...student.subject.subjects,
          { sub_name: "", sub_marks: 0 }
        ]
      }
    });
  }

  function removeSubject(index) {
    let updated = [...student.subject.subjects];
    updated.splice(index, 1);

    setStudent({
      ...student,
      subject: { subjects: updated }
    });
  }

  function handleSubjectChange(index, field, value) {
    let updated = [...student.subject.subjects];
    updated[index][field] = value;

    setStudent({
      ...student,
      subject: { subjects: updated }
    });
  }

  function openScore(student) {
    setSelectedStudent(student);
    setShowScore(true);
  }

  function openAdd() {
    setStudent({
      std_name: "",
      std_email: "",
      std_phoneno: "",
      std_city: "",
      std_class: "",
      std_gender: "",
      std_fees: "",
      std_password: "",
      status: "ACTIVE",
      subject: { subjects: [] }
    });
    setIsEdit(false);
    setShow(true);
  }

  function openEdit(obj) {
    setStudent({
      ...obj,
      subject: obj.subject || { subjects: [] }
    });
    setIsEdit(true);
    setShow(true);
  }

  async function saveStudent() {

    let payload = {
      ...student,
      std_class: Number(student.std_class),
      std_fees: Number(student.std_fees)
    };

    let url = isEdit
      ? "http://localhost:8080/studentSection/updateStudent"
      : "http://localhost:8080/studentSection/createNewStudent";

    let method = isEdit ? "PUT" : "POST";

    let res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setShow(false);
      getStudents();
    } else {
      alert("Operation failed");
    }
  }

  async function deleteStudent(obj) {
    await fetch(
      `http://localhost:8080/studentSection/deleteStudent?id=${obj.std_id}`,
      { method: "DELETE" }
    );
    getStudents();
  }

  return (
    <div className="section-dashboard container-fluid">
      <div className="section-header">
        <div>
          <h2>Student Management</h2>
          <p>Manage students easily</p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="light" onClick={props.goBack}>Back</Button>
          <Button variant="light" onClick={openAdd}>Add Student</Button>
        </div>
      </div>

      <Row className="mt-3">
        <Col md={3}>
          <Form.Select onChange={(e) => setStdClass(e.target.value)}>
            <option>--Select--</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>Class {i + 1}</option>
            ))}
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
                          <td>{x.std_phoneno}</td>
                          <td>₹ {x.std_fees}</td>
                          <td><Button size="sm" variant="info" onClick={() => openScore(x)}>View</Button></td>
                          <td><span className={(x.status || "ACTIVE") === "ACTIVE" ? "badge-active" : "badge-inactive"}>{x.status || "ACTIVE"}</span></td>
                          <td><Button size="sm" variant="warning" onClick={() => openEdit(x)}>Update</Button></td>
                          <td><Button size="sm" variant="danger" onClick={() => deleteStudent(x)}>Delete</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">No Students Found</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Update Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" placeholder="Name" name="std_name" value={student.std_name} onChange={handleChange}/>
            <Form.Control className="mb-2" placeholder="Email" name="std_email" value={student.std_email} onChange={handleChange}/>
            <Form.Control className="mb-2" placeholder="Phone" name="std_phoneno" value={student.std_phoneno} onChange={handleChange}/>
            <Form.Control className="mb-2" placeholder="City" name="std_city" value={student.std_city} onChange={handleChange}/>
            <Form.Control className="mb-2" placeholder="Class" name="std_class" value={student.std_class} onChange={handleChange}/>
            <Form.Control className="mb-2" placeholder="Fees" name="std_fees" value={student.std_fees} onChange={handleChange}/>

            <Form.Select className="mb-2" name="std_gender" value={student.std_gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>

            <Form.Select className="mb-2" name="status" value={student.status} onChange={handleChange}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </Form.Select>

            <Form.Control className="mb-2" placeholder="Password" name="std_password" value={student.std_password} onChange={handleChange}/>

            <h6 className="mt-3">Subjects</h6>
            <Button size="sm" variant="secondary" onClick={addSubject}>Add Subject</Button>
            {
              student.subject.subjects.map((sub, index) => (
                <Row key={index} className="mt-2">
                  <Col md={5}>
                    <Form.Control placeholder="Subject Name" value={sub.sub_name} onChange={(e) => handleSubjectChange(index, "sub_name", e.target.value)}/>
                  </Col>

                  <Col md={4}>
                    <Form.Control type="number" value={sub.sub_marks} onChange={(e) => handleSubjectChange(index, "sub_marks", Number(e.target.value))}/>
                  </Col>

                  <Col md={3}>
                    <Button variant="danger" onClick={() => removeSubject(index)}>Remove</Button>
                  </Col>
                </Row>
              ))
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="success" onClick={saveStudent}>{isEdit ? "Update" : "Add"}</Button>
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

export default StudentPageSS;