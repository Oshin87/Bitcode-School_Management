package com.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.module.Student;
import com.app.controller.module.StudentSection;
import com.app.controller.module.Teacher;
import com.app.service.StudentSectionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/studentSection")
public class StudentSectionController {

	private final StudentSectionService ss;

	public StudentSectionController(StudentSectionService ss) {
		this.ss = ss;
	}
	
	@GetMapping("/")
	public String getHome() {
		return "Home";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> getStudent(@RequestBody StudentSection section) {
	    StudentSection s = ss.getStudentSection(section.getSec_email(), section.getSec_password());
	    if (s != null) {
	        return ResponseEntity.ok(s);
	    } else {
	        return ResponseEntity.status(401).body("Invalid Credentials");
	    }
	}
	
	@PutMapping("/updatePassword")
	public ResponseEntity<?> updatePass(@RequestBody StudentSection section) {
	    if (section.getSec_id() == 0 || section.getSec_password() == null) {
	        return ResponseEntity.badRequest().body("Invalid request");
	    }
	    StudentSection updated = ss.updateSectionPassword(section);
	    if (updated != null) {
	        return ResponseEntity.ok(updated);
	    } else {
	        return ResponseEntity.status(404).body("Section not found");
	    }
	}	
	
	@PostMapping("/createNewStudent")
	public Student createNewStudent(@RequestBody Student std) {
		return ss.createNewStudent(std);
	}
	
	@GetMapping("/getStudent")
	public List<Student> getStudentByClass(@RequestParam int std_class) {
		return ss.getStudents(std_class);
	}
	
	@DeleteMapping("/deleteStudent")
	public void removeStudent(@RequestParam int id) {
		ss.remove(id);
	}
	
	@PutMapping("/updateStudent")
	public ResponseEntity<?> updateStudent(@RequestBody Student std) {
	    Student s = ss.updateStudent(std);
	    return ResponseEntity.ok(s);
	}
	
	@PostMapping("/createNewTeacher")
	public Teacher createNewTeacher(@RequestBody Teacher t) {
		return ss.createNewTeacher(t);
	}
	
	@PutMapping("/updateTeacher")
	public ResponseEntity<?> updateTeacher(@RequestBody Teacher teacher) {
	    Teacher t = ss.updateTeacher(teacher);
	    return ResponseEntity.ok(t);
	}
	
	@DeleteMapping("/deleteTeacher")
	public void removeTeacher(@RequestParam int id) {
		ss.removeT(id);
	}
	
	@GetMapping("/getAllTeachers")
	public List<Teacher> getAllTeacher() {
		return ss.getAllTeacher();
	}

}
