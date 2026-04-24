package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.controller.module.Teacher;

public interface TeacherRepo extends JpaRepository<Teacher, Integer> {
	@Query("select u from Teacher u where u.t_name = :name")
	Teacher findByName(@Param("name") String name);
	
	@Query("select u from Teacher u where u.t_email = :email")
	Teacher findByEmail(@Param("email") String email);
}
