package com.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.controller.module.Admin;
import com.app.controller.module.Student;
import com.app.controller.module.StudentSection;
import com.app.controller.module.Teacher;
import com.app.repository.AdminRepo;
import com.app.repository.StudentRepo;
import com.app.repository.StudentSectionRepo;
import com.app.repository.TeacherRepo;

@Service
public class AdminService {

	private final AdminRepo ar;
	private final StudentSectionRepo ssr;
	private final StudentRepo sr;
	private final TeacherRepo tr;
	
	public AdminService(AdminRepo ar, StudentSectionRepo ssr, StudentRepo sr, TeacherRepo tr) {
		this.ar = ar;
		this.ssr = ssr;
		this.sr = sr;
		this.tr = tr;
	}
	
	public Admin getAdmin(String email, String pass) {
		Admin ad = ar.findByEmail(email);
		if(ad != null && ad.getAdmin_password().equals(pass)) {
			return ad;
		}
		return null;
	}
	
	public StudentSection createNewStudentSection(StudentSection s) {
		return ssr.save(s);
	}
	
	public Admin createNewAdmin(Admin a) {
		return ar.save(a);
	}
	
	public StudentSection updateStudentSection(StudentSection s) {
		StudentSection ss = ssr.findById(s.getSec_id()).orElseThrow(()-> new RuntimeException("Student Section Account Not Found"));
		ss.setSec_name(s.getSec_name());
		ss.setSec_password(s.getSec_password());
		ss.setSec_email(s.getSec_password());
		ss.setSec_status(s.getSec_status());
		return ssr.save(ss);
	}
	
	public List<StudentSection> getAll() {
		return ssr.findAll();
	}
	
	public void deleteStudentSection(StudentSection section) {
		StudentSection ss = ssr.findById(section.getSec_id()).orElseThrow(()-> new RuntimeException("Student Section Account Not Found"));
		ssr.delete(ss);
	}
	
	public List<Student> getAllStudents(int std_class) {
		return sr.findByClass(std_class);
	}
	
	public Student updateStudent(Student std) {
		Student s = sr.findById(std.getStd_id()).orElseThrow(()-> new RuntimeException("Student Account Not Found"));
		if(s!=null) {
			s.setStatus(std.getStatus());
			s.setStd_city(std.getStd_city());
			s.setStd_class(std.getStd_class());
			s.setStd_email(std.getStd_email());
			s.setStd_fees(std.getStd_fees());
			s.setStd_gender(std.getStd_gender());
			s.setStd_name(std.getStd_name());
			s.setStd_password(std.getStd_password());
			s.setStd_phoneno(std.getStd_phoneno());
		}
		return sr.save(s);
	}
	
	public void deleteStudent(int id) {
	    sr.deleteById(id);
	}
	
	public List<Teacher> getAllTeacher() {
		return tr.findAll();
	}
	
	public Teacher updateTeacher(Teacher t) {
		Teacher te = tr.findById(t.getT_id()).orElseThrow(()-> new RuntimeException("Teacher Account Not Found"));
		if(te!=null) {
			te.setStatus(t.getStatus());
			te.setT_email(t.getT_email());
			te.setT_gender(t.getT_gender());
			te.setT_name(t.getT_name());
			te.setT_password(t.getT_password());
			te.setT_salary(t.getT_salary());
			te.setT_subject(t.getT_subject());
		}
		return tr.save(te);
	}
	
	public void deleteTeacher(int id) {
		tr.deleteById(id);
	}

	public Teacher addTeacher(Teacher t) {
		return tr.save(t);
	}
}
