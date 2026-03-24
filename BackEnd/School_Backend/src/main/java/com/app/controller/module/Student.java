package com.app.controller.module;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int std_id;
	private String std_name;
	private String std_email;
	private int std_class;
	private String std_city;
	private long std_phoneno;
	private double std_fees;
	private String std_gender;
	@OneToOne(cascade = CascadeType.ALL)
	private Subject subject;
	private String std_password;
	
	public Student() {}
	
	public String getStd_email() {
		return std_email;
	}
	public void setStd_email(String std_email) {
		this.std_email = std_email;
	}
	public String getStd_password() {
		return std_password;
	}
	public void setStd_password(String std_password) {
		this.std_password = std_password;
	}
	public int getStd_id() {
		return std_id;
	}
	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}
	public String getStd_name() {
		return std_name;
	}
	public void setStd_name(String std_name) {
		this.std_name = std_name;
	}
	public int getStd_class() {
		return std_class;
	}
	public void setStd_class(int std_class) {
		this.std_class = std_class;
	}
	public String getStd_city() {
		return std_city;
	}
	public void setStd_city(String std_city) {
		this.std_city = std_city;
	}
	public long getStd_phoneno() {
		return std_phoneno;
	}
	public void setStd_phoneno(long std_phoneno) {
		this.std_phoneno = std_phoneno;
	}
	public double getStd_fees() {
		return std_fees;
	}
	public void setStd_fees(double std_fees) {
		this.std_fees = std_fees;
	}
	public String getStd_gender() {
		return std_gender;
	}
	public void setStd_gender(String std_gender) {
		this.std_gender = std_gender;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	
}
