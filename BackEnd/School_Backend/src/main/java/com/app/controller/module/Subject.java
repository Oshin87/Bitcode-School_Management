package com.app.controller.module;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Subject {

	@Id
	private int sub_id;
	@ElementCollection
	private List<String> sub_name;
	@ElementCollection
	private List<Integer> sub_marks;
	
	public Subject() {}
	
	public int getSub_id() {
		return sub_id;
	}
	public void setSub_id(int sub_id) {
		this.sub_id = sub_id;
	}
	public List<String> getSub_name() {
		return sub_name;
	}
	public void setSub_name(List<String> sub_name) {
		this.sub_name = sub_name;
	}
	public List<Integer> getSub_marks() {
		return sub_marks;
	}
	public void setSub_marks(List<Integer> sub_marks) {
		this.sub_marks = sub_marks;
	}
	
}
