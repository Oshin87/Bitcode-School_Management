package com.app.controller.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Teacher {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int t_id;
	private String t_name;
	private String t_email;
	private String t_gender;
	private String t_subject;
	private double t_salary;
	private String t_password;
	private String status;

	
	public String getT_password() {
		return t_password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setT_password(String t_password) {
		this.t_password = t_password;
	}

	public Teacher() {}

	public int getT_id() {
		return t_id;
	}

	public void setT_id(int t_id) {
		this.t_id = t_id;
	}

	public String getT_name() {
		return t_name;
	}

	public void setT_name(String t_name) {
		this.t_name = t_name;
	}

	public String getT_email() {
		return t_email;
	}

	public void setT_email(String t_email) {
		this.t_email = t_email;
	}

	public String getT_gender() {
		return t_gender;
	}

	public void setT_gender(String t_gender) {
		this.t_gender = t_gender;
	}

	public String getT_subject() {
		return t_subject;
	}

	public void setT_subject(String t_subject) {
		this.t_subject = t_subject;
	}

	public double getT_salary() {
		return t_salary;
	}

	public void setT_salary(double t_salary) {
		this.t_salary = t_salary;
	}

}
