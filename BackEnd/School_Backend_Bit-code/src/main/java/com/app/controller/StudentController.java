package com.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.module.Student;
import com.app.service.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {

	private final StudentService ss;

	public StudentController(StudentService ss) {
		this.ss = ss;
	}
	
	@GetMapping("/")
	public String getHome() {
		return "Home";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> getStudent(@RequestBody Student student) {
	    Student s = ss.getStudent(student.getStd_email(), student.getStd_password());

	    if (s != null) {
	        return ResponseEntity.ok(s);
	    } else {
	        return ResponseEntity.status(401).body("Invalid Credentials");
	    }
	}
	
	@PutMapping("/updatePassword")
	public Student updatePassword(@RequestBody Student std) {
		return ss.updatePassword(std.getStd_id(), std.getStd_password());
	}

}
