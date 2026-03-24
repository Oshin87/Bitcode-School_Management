package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.controller.module.Teacher;

public interface TeacherRepo extends JpaRepository<Teacher, Integer> {

}
