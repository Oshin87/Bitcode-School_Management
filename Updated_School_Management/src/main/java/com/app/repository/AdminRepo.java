package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.controller.module.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer>{
	@Query("select u from Admin u where u.admin_email = :email")
	Admin findByEmail(@Param("email") String email);
}
