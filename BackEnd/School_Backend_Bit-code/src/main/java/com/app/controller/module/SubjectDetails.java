package com.app.controller.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SubjectDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
    private String sub_name;
    private int sub_marks;

    public SubjectDetails() {}

	public String getSub_name() {
		return sub_name;
	}

	public void setSub_name(String sub_name) {
		this.sub_name = sub_name;
	}

	public int getSub_marks() {
		return sub_marks;
	}

	public void setSub_marks(int sub_marks) {
		this.sub_marks = sub_marks;
	}

}