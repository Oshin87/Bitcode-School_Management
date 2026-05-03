package com.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.controller.module.Student;
import com.app.controller.module.SubjectDetails;
import com.app.controller.module.Teacher;
import com.app.repository.StudentRepo;
import com.app.repository.TeacherRepo;

@Service
public class TeacherService {

	private final TeacherRepo tr;
	private final StudentRepo sr;	
	public TeacherService(TeacherRepo tr, StudentRepo sr) {
		this.tr = tr;
		this.sr = sr;
	}

	public Teacher getTeacher(String email, String pass) {
		Teacher tec = tr.findByEmail(email);
		if(tec!=null && tec.getT_password().equals(pass)) {
			return tec;
		}
		return null;
	}
	
	public List<Student> findByClassAndSubject(String std_class, String subject) {
	    return sr.findByClassAndSubject(std_class, subject);
	}
	
	public List<Student> getAllStudents(String name) {
		List<Student> std = sr.findBySubjectName(name);
		return std;
	}
	
	public Student updateMarks(Student std, String sub) {

	    Student s = sr.findById(std.getStd_id()).orElseThrow(() -> new RuntimeException("Student doesn't exist"));
	    List<SubjectDetails> subDetails = s.getSubject().getSubjects();
	    List<SubjectDetails> newSub = std.getSubject().getSubjects();

	    if (newSub == null || newSub.isEmpty()) return s;

	    int newMarks = newSub.get(0).getSub_marks();

	    for (SubjectDetails sd : subDetails) {
	        if (sd.getSub_name().equals(sub)) {
	            sd.setSub_marks(newMarks);
	        }
	    }
	    return sr.save(s);
	}
	
	public Teacher updatePassword(Teacher t) {
		Teacher tec = tr.findById(t.getT_id()).orElseThrow(()-> new RuntimeException("Teacher Not Found"));
		if(tec != null) {
			tec.setT_password(t.getT_password());
			return tr.save(tec);
		}
		return null;
	}
	
}
