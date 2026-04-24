import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalTitle, Table } from "react-bootstrap";

function StudentPageSS() {

  const [students , setStudents ] = useState([]);
  const [ modalUpdate, setModalUpdate ] = useState(false);
  const [ std,setSTD ] = useState({});
  const [ student,setStudent ] = useState({
    std_id : "",
    std_name: "",
    std_email: "",
    std_class: "",
    std_city: "",
    std_phoneno: "",
    std_fees: "",
    std_gender: "",
    status: "",
    std_password: ""
  });

  async function getStudent(){
    let request = await fetch("http://localhost:8080/studentSection/getAllStudents");
    let response = await request.json();
    setStudents(response);
  }

  useEffect(()=>{
    getStudent();
  },[]);

  async function funDelete(obj){
    setSTD(obj);
    await fetch("http://localhost:8080/studentSection/deleteStudent",{
      method:"DELETE",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify(std)
    });
  }

  function handleChange(e) {
    setSection({
      ...section,
      [e.target.name]: e.target.value
    });
  }

  function funUpdate(obj){
    setStudent({
    std_id : obj.std_id || "",
    std_name:obj.std_name || "",
    std_email: obj.std_email || "",
    std_class: obj.std_class || "",
    std_city: obj.std_city || "",
    std_phoneno: obj.std_phoneno || "",
    std_fees: obj.std_fees || "",
    std_gender: obj.std_gender || "",
    status: obj.status || "",
    std_password: obj.std_password || ""
    });
    setModalUpdate(true);
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Fees</th>
            <th>Gender</th>
            <th>Phone No.</th>
            <th>Password</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map((x)=>{
              return(
                <tr key={x.std_id}>
                  <td>{x.std_id}</td>
                  <td>{x.std_name}</td>
                  <td>{x.std_email}</td>
                  <td>{x.std_class}</td>
                  <td>{x.std_fees}</td>
                  <td>{x.std_gender}</td>
                  <td>{x.std_phoneno}</td>
                  <td>{x.std_password}</td>
                  <td>{x.status}</td>
                  <td><Button onClick={()=>{funUpdate(x)}}>Update</Button></td>
                  <td><Button onClick={()=>{funDelete(x)}}>Delete</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={modalUpdate} onHide={handleclose} centered scrollable>
        <ModalHeader closeButton>
          <ModalTitle>Update Student</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" value={std?.std_name || ""} />
            </FormGroup>
            <FormGroup>
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" name="" value={std?.std_name || ""} />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default StudentPageSS;