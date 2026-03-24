package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.module.Student;
import com.app.controller.module.Teacher;
import com.app.service.StudentSectionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
	
	@PostMapping("/createNewStudent")
	public Student createNewStudent(@RequestBody Student std) {
		return ss.createNewStudent(std);
	}
	
	@PostMapping("/createNewTeacher")
	public Teacher createNewTeacher(@RequestBody Teacher t) {
		return ss.createNewTeacher(t);
	}

}
