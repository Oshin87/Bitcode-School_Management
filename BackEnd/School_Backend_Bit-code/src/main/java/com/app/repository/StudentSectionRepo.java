package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.controller.module.StudentSection;

public interface StudentSectionRepo extends JpaRepository<StudentSection, Integer> {
	@Query("select u from StudentSection u where u.sec_email = :email")
	StudentSection findByEmail(@Param("email") String email);
}
