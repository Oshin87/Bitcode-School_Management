package com.app.service;

import org.springframework.stereotype.Service;

import com.app.controller.module.Student;
import com.app.controller.module.Teacher;
import com.app.repository.StudentRepo;
import com.app.repository.TeacherRepo;

@Service
public class StudentSectionService {

	private final StudentRepo sr;
	private final TeacherRepo tr;

	public StudentSectionService(StudentRepo sr, TeacherRepo tr) {
		this.sr = sr;
		this.tr = tr;
	}
	
	public Student createNewStudent(Student std) {
		return sr.save(std);
	}
	
	public Teacher createNewTeacher(Teacher t) {
		return tr.save(t);
	}
	
	
}
