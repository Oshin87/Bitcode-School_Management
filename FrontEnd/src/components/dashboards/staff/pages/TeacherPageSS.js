import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";

function TeacherPageSS(props) {

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
    status: "ACTIVE"
  });

  async function getTeachers() {
    let res = await fetch("http://localhost:8080/studentSection/getAllTeachers");
    let data = await res.json();
    setArr(data);
  }

  useEffect(() => {
    getTeachers();
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

  function openEdit(obj) {
    setTeacher({
      ...obj,
      status: obj.status || "ACTIVE"
    });
    setIsEdit(true);
    setShow(true);
  }

  async function saveTeacher() {

    let payload = {
      t_name: teacher.t_name,
      t_email: teacher.t_email,
      t_gender: teacher.t_gender,
      t_subject: teacher.t_subject,
      t_salary: teacher.t_salary ? Number(teacher.t_salary) : 0,
      t_password: teacher.t_password,
      status: teacher.status || "ACTIVE"
    };

    if (isEdit) {
      payload.t_id = teacher.t_id;
    }

    let url = isEdit
      ? "http://localhost:8080/studentSection/updateTeacher"
      : "http://localhost:8080/studentSection/createNewTeacher";

    let method = isEdit ? "PUT" : "POST";

    let res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setShow(false);
      getTeachers();
    } else {
      let err = await res.text();
      console.log("Backend Error:", err);
      alert("Failed to save teacher");
    }
  }

  async function deleteTeacher(obj) {
    await fetch(
      `http://localhost:8080/studentSection/deleteTeacher?id=${obj.t_id}`,
      { method: "DELETE" }
    );
    getTeachers();
  }

  return (
    <div className="section-dashboard container-fluid">
      <div className="section-header">
        <div>
          <h2>Teacher Management</h2>
          <p>Manage teachers easily</p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="light" onClick={props.goBack}>Back</Button>
          <Button variant="light" onClick={openAdd}>Add Teacher</Button>
        </div>
      </div>

      <Row className="mt-3">
        <Col md={4}>
          <Form.Control placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </Col>
      </Row>

      <Row className="mt-4 w-100 m-0">
        <Col md={12}>
          <Card className="section-card">
            <Card.Body>
              <h5 className="mb-3">All Teachers</h5>
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
                          <td>₹ {x.t_salary}</td>
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

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Update Teacher" : "Add Teacher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" placeholder="Name" name="t_name" value={teacher.t_name} onChange={handleChange}/>

            <Form.Control className="mb-2" placeholder="Email" name="t_email" value={teacher.t_email} onChange={handleChange}/>

            <Form.Select className="mb-2" name="t_gender" value={teacher.t_gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>

            <Form.Control className="mb-2" placeholder="Subject" name="t_subject" value={teacher.t_subject} onChange={handleChange}/>

            <Form.Control className="mb-2" placeholder="Salary" name="t_salary" value={teacher.t_salary} onChange={handleChange}/>

            <Form.Select className="mb-2" name="status" value={teacher.status} onChange={handleChange}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </Form.Select>

            <Form.Control className="mb-2" placeholder="Password" name="t_password" value={teacher.t_password} onChange={handleChange}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="success" onClick={saveTeacher}>{isEdit ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeacherPageSS;