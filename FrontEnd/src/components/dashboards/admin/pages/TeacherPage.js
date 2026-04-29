import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";

function TeacherPage(props) {

  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [teacher, setTeacher] = useState({
    t_id: "",
    t_name: "",
    t_email: "",
    t_gender: "",
    t_subject: "",
    t_salary: "",
    t_password: "",
    status: ""
  });

  async function getAllTeacher() {
    let res = await fetch("http://localhost:8080/admin/getAllTeacher");
    let data = await res.json();
    setArr(data);
  }

  useEffect(() => {
    getAllTeacher();
  }, []);

  const filteredArr = arr.filter((x) =>
    x.t_name?.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    });
  }

  function openAdd() {
    setTeacher({
      t_id: "",
      t_name: "",
      t_email: "",
      t_gender: "",
      t_subject: "",
      t_salary: "",
      t_password: "",
      status: "ACTIVE"
    });
    setIsEdit(false);
    setShow(true);
  }

  async function addTeacher() {
    let payload = {
      t_name: teacher.t_name,
      t_email: teacher.t_email,
      t_gender: teacher.t_gender,
      t_subject: teacher.t_subject,
      t_salary: Number(teacher.t_salary),
      t_password: teacher.t_password,
      status: teacher.status || "ACTIVE"
    };

    await fetch("http://localhost:8080/admin/addTeacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setShow(false);
    getAllTeacher();
  }

  function openEdit(obj) {
    setTeacher({
      ...obj,
      status: obj.status || "ACTIVE"
    });
    setIsEdit(true);
    setShow(true);
  }

  async function updateTeacher() {
    let payload = {
      ...teacher,
      t_salary: Number(teacher.t_salary),
      status: teacher.status || "ACTIVE"
    };

    await fetch("http://localhost:8080/admin/updateTeacher", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setShow(false);
    getAllTeacher();
  }

  async function deleteTeacher(obj) {
    await fetch(`http://localhost:8080/admin/deleteTeacher?id=${obj.t_id}`,{ method: "DELETE" });
    getAllTeacher();
  }

  return (
    <div className="section-dashboard container-fluid">

      <div className="section-header">
        <div>
          <h2>Teacher Management</h2>
          <p>Manage all teachers easily</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="light" onClick={props.goBack}>Back</Button>
          <Button variant="light" onClick={openAdd}>New Teacher</Button>
        </div>
      </div>

      <Row className="mt-4 w-100 m-0">
        <Col md={12}>
          <Card className="section-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">All Teachers</h5>
                <Form.Control placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: "250px" }}/>
              </div>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Subject</th>
                    <th>Salary</th>
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
                          <td>{x.t_id}</td>
                          <td>{x.t_name}</td>
                          <td>{x.t_email}</td>
                          <td>{x.t_gender}</td>
                          <td>{x.t_subject}</td>
                          <td>{x.t_salary}</td>
                          <td><span className={(x.status || "ACTIVE") === "ACTIVE" ? "badge-active" : "badge-inactive"}>{x.status || "ACTIVE"}</span></td>
                          <td><Button size="sm" variant="warning" onClick={() => openEdit(x)}>Update</Button></td>
                          <td><Button size="sm" variant="danger" onClick={() => deleteTeacher(x)}>Delete</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">No Teachers Found</td>
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
          <Modal.Title>{isEdit ? "Update Teacher" : "Add Teacher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="t_name" value={teacher.t_name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="t_email" value={teacher.t_email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="t_gender" value={teacher.t_gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Subject</Form.Label>
              <Form.Control name="t_subject" value={teacher.t_subject} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control name="t_salary" value={teacher.t_salary} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={teacher.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control name="t_password" value={teacher.t_password} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="success" onClick={isEdit ? updateTeacher : addTeacher}>{isEdit ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default TeacherPage;