package com.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.module.Admin;
import com.app.controller.module.Student;
import com.app.controller.module.StudentSection;
import com.app.controller.module.Teacher;
import com.app.service.AdminService;
import com.app.service.StudentSectionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	private final AdminService as;

	public AdminController(AdminService as) {
		this.as = as;
	}
	
	@GetMapping("/")
	public String getHome() {
		return "Welcome Admin";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> getStudent(@RequestBody Admin admin) {
		Admin ad = as.getAdmin(admin.getAdmin_email(), admin.getAdmin_password());

	    if (ad != null) {
	        return ResponseEntity.ok(ad);
	    } else {
	        return ResponseEntity.status(401).body("Invalid Credentials");
	    }
	}
	
	@PostMapping("/createNewStudentSection")
	public StudentSection createNewStudentSection(@RequestBody StudentSection s) {
		return as.createNewStudentSection(s);
	}
	
	@PutMapping("/updateStudentSection")
	public ResponseEntity<?> updateStudentSection(@RequestBody StudentSection section) {
		StudentSection sec = as.updateStudentSection(section);
	    return ResponseEntity.ok(sec);
	}
	
	@DeleteMapping("/deleteStudentSection")
	public void removeStudentSection(@RequestBody StudentSection ss) {
		as.deleteStudentSection(ss);
	}
	
	@GetMapping("/getallStudentSection")
	public List<StudentSection> getAll() {
		return as.getAll();
	}
	
	@PostMapping("/createAdmin")
	public Admin createNewAdminr(@RequestBody Admin a) {
		return as.createNewAdmin(a);
	}
	
	@GetMapping("/allStudent")
	public List<Student> allStudent(@RequestParam int std_class) {
		return as.getAllStudents(std_class);
	}
	
	@PutMapping("/updateStudent")
	public Student updateStudent(@RequestBody Student std) {
		return as.updateStudent(std);
	}

	@DeleteMapping("/deleteStudent")
	public ResponseEntity<?> deleteStudent(@RequestParam int id) {
	    as.deleteStudent(id);
	    return ResponseEntity.ok("Deleted Successfully");
	}
	
	@GetMapping("/getAllTeacher")
	public List<Teacher> getAllTeacher(){
		return as.getAllTeacher();
	}
	
	@PostMapping("/addTeacher")
	public Teacher addTeacher(@RequestBody Teacher t){
	    return as.addTeacher(t);
	}

	@PutMapping("/updateTeacher")
	public Teacher updateTeacher(@RequestBody Teacher t) {
		return as.updateTeacher(t);	
	}

	@DeleteMapping("/deleteTeacher")
	public ResponseEntity<?> deleteTeacher(@RequestParam int id){
	    as.deleteTeacher(id);
	    return ResponseEntity.ok("Teacher Deleted Successfully");
	}
	
}
