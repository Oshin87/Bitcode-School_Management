package com.app.service;

import org.springframework.stereotype.Service;

import com.app.controller.module.Student;
import com.app.repository.StudentRepo;

@Service
public class StudentService {

	private final StudentRepo sr;

	public StudentService(StudentRepo sr) {
		this.sr = sr;
	}
	
	public Student getStudent(String email, String pass) {
		Student std = sr.findByEmail(email);
		if(std != null && std.getStd_password().equals(pass)) {
			return std;
		}
		return null;
	}
	
	public Student updatePassword(int id,String pass) {
		Student std = sr.findById(id).orElseThrow(()-> new RuntimeException("Student Not Found"));
		if(std != null) {
			std.setStd_password(pass);
		}
		return sr.save(std);	
	}
}
