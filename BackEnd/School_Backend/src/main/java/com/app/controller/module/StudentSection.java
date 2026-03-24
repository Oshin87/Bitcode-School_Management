package com.app.controller.module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StudentSection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sec_id;
	private String sec_name;
	private String sec_email;
	private String sec_password;
	
	public StudentSection() {}
	
	public int getSec_id() {
		return sec_id;
	}
	public void setSec_id(int sec_id) {
		this.sec_id = sec_id;
	}
	public String getSec_name() {
		return sec_name;
	}
	public void setSec_name(String sec_name) {
		this.sec_name = sec_name;
	}
	public String getSec_email() {
		return sec_email;
	}
	public void setSec_email(String sec_email) {
		this.sec_email = sec_email;
	}
	public String getSec_password() {
		return sec_password;
	}
	public void setSec_password(String sec_password) {
		this.sec_password = sec_password;
	}
}
