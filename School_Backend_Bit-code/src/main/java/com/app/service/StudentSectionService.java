package com.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.controller.module.Student;
import com.app.controller.module.StudentSection;
import com.app.controller.module.Teacher;
import com.app.repository.StudentRepo;
import com.app.repository.StudentSectionRepo;
import com.app.repository.TeacherRepo;

@Service
public class StudentSectionService {

	private final StudentRepo sr;
	private final TeacherRepo tr;
	private final StudentSectionRepo ssr;
	
	public StudentSectionService(StudentRepo sr, TeacherRepo tr, StudentSectionRepo ssr) {
		this.sr = sr;
		this.tr = tr;
		this.ssr = ssr;
	}

	public Student createNewStudent(Student std) {
		return sr.save(std);
	}
	
	public Teacher createNewTeacher(Teacher t) {
		return tr.save(t);
	}
	
	public Student updateStudent(Student std) {
		Student s = sr.findById(std.getStd_id()).orElseThrow(()-> new RuntimeException("Student Not Found"));
		s.setStd_name(std.getStd_name());
        s.setStd_email(std.getStd_email());
        s.setStd_class(std.getStd_class());
        s.setStd_city(std.getStd_city());
        s.setStd_gender(std.getStd_gender());
        s.setStd_phoneno(std.getStd_phoneno());
        s.setStd_fees(std.getStd_fees());
        return sr.save(s);
	}
	
	public Teacher updateTeacher(Teacher teacher) {
	    Teacher t = tr.findById(teacher.getT_id()).orElseThrow(() -> new RuntimeException("Teacher Not Found"));
	    t.setT_name(teacher.getT_name());
	    t.setT_email(teacher.getT_email());
	    t.setT_gender(teacher.getT_gender());
	    t.setT_salary(teacher.getT_salary());
	    t.setT_subject(teacher.getT_subject());
	    return tr.save(t);
	}
	
	public StudentSection getStudentSection(String email, String pass) {
		StudentSection sec = ssr.findByEmail(email);
		if(sec != null && sec.getSec_password().equals(pass)) {
			return sec;
		}
		return null;
	}
	

}
