package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.controller.module.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {
	@Query("select u from Student u where u.std_email = :email")
	Student findByEmail(@Param("email") String email);
	
	@Query("SELECT s FROM Student s JOIN s.subject subj JOIN subj.subjects sd WHERE sd.sub_name = :name")
	List<Student> findBySubjectName(@Param("name") String name);
	
	 @Query("SELECT s FROM Student s JOIN s.subject subj JOIN subj.subjects sd WHERE s.std_class = :std_class AND sd.sub_name = :subject")
	 List<Student> findByClassAndSubject(@Param("std_class") String std_class,@Param("subject") String subject);
	 
	 @Query("select u from Student u where u.std_class = :class")
	 List<Student> findByClass(@Param("class") int std_class);
}
