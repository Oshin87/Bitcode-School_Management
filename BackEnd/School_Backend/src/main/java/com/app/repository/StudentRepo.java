package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.controller.module.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {
	@Query("select u from Student u where u.std_email = :email")
	Student findByEmail(@Param("email") String email);
}
