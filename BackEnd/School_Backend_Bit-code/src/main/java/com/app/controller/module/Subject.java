package com.app.controller.module;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sub_id;
	@OneToMany(cascade = CascadeType.ALL)
	private List<SubjectDetails> subjects;
	
	public Subject() {}
	
	public int getSub_id() {
		return sub_id;
	}
	public void setSub_id(int sub_id) {
		this.sub_id = sub_id;
	}
	public List<SubjectDetails> getSubjects() {
		return subjects;
	}
	public void setSubjects(List<SubjectDetails> subjects) {
		this.subjects = subjects;
	}
	
	
	
}
