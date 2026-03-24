package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.module.Student;
import com.app.service.StudentService;

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
	
	@GetMapping("/login/query")
	public Student getStudent(@RequestParam String email,@RequestParam String pass) {
		return ss.getStudent(email, pass);
	}
	
	@PutMapping("/updatePassword/query")
	public Student updatePassword(@RequestParam int id, @RequestParam String pass) {
		return ss.updatePassword(id, pass);
	}

}
