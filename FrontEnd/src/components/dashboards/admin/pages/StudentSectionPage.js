import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "./StudentSectionPage.css";

function StudentSectionPage(props) {

  const [arr , setArr] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [section,setSection] = useState({
    sec_id: "",
    sec_name: "",
    sec_email: "",
    sec_status: "",
    sec_password: ""
  });



  async function getAll(){
    let request = await fetch("http://localhost:8080/admin/getallStudentSection");
    let response = await request.json();
    setArr(response);
  }

  useEffect(()=>{
    getAll();
  },[]);

  const filteredArr = arr.filter((item) =>
    item.sec_name?.toLowerCase().includes(search.toLowerCase())
  );

  function funUpdate(obj){
    setSection({
      sec_id: obj.sec_id || "",
      sec_name: obj.sec_name || "",
      sec_email: obj.sec_email || "",
      sec_status: obj.sec_status || "",
      sec_password: obj.sec_password || ""
    });
    setIsEdit(true);
    setShow(true);
  }

  function handleChange(e) {
    setSection({
      ...section,
      [e.target.name]: e.target.value
    });
  }

  async function updateObject(){
    await fetch("http://localhost:8080/admin/updateStudentSection", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section)
    });
    setShow(false);
    getAll();
  }

  async function funDelete(obj){
    await fetch("http://localhost:8080/admin/deleteStudentSection",{
      method:"DELETE",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(obj)
    });
    getAll();
  }

  async function addObject(){
    await fetch("http://localhost:8080/admin/createNewStudentSection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sec_name: section.sec_name,
        sec_email: section.sec_email,
        sec_status: section.sec_status,
        sec_password: section.sec_password
      })
    });
    setShow(false);
    getAll();
  }

  return (
    <div className="section-dashboard container-fluid">

      <div className="section-header">
        <div>
          <h2>Student Section</h2>
          <p>Manage all section accounts easily</p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="light" onClick={props.goBack}>Back</Button>

          <Button variant="light" onClick={() => { setSection({ sec_id: "", sec_name: "", sec_email: "", sec_status: "",sec_password: ""}); setIsEdit(false); setShow(true);}}>New Student Section</Button>
        </div>
      </div>

      <Row className="mt-4 w-100 m-0">
        <Col md={12}>
          <Card className="section-card">
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">All Sections</h5>
                <Form.Control type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: "250px" }}/>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
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
                          <td>{x.sec_id}</td>
                          <td>{x.sec_email}</td>
                          <td>{x.sec_name}</td>
                          <td><span className={x.sec_status === "ACTIVE"? "badge-active" : "badge-inactive"}>{x.sec_status}</span></td>
                          <td><Button variant="warning" size="sm" onClick={() => funUpdate(x)}>Update</Button></td>

                          <td><Button variant="danger" size="sm" onClick={() => funDelete(x)} >Delete</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No Matching Sections Found</td>
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
          <Modal.Title>{isEdit ? "Update Section" : "Add Section"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="sec_name" value={section.sec_name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="sec_email" value={section.sec_email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="sec_status" value={section.sec_status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="sec_password" value={section.sec_password} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="success" onClick={isEdit ? updateObject : addObject}> {isEdit ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default StudentSectionPage;