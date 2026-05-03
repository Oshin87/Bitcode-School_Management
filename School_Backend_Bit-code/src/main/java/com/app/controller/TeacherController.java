package com.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.controller.module.Student;
import com.app.controller.module.Teacher;
import com.app.service.TeacherService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/teacher")
public class TeacherController {

    private final TeacherService ts;

    public TeacherController(TeacherService ts) {
        this.ts = ts;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody Teacher teacher) {
        Teacher t = ts.getTeacher(teacher.getT_email(), teacher.getT_password());

        if (t != null) {
            t.setT_password(null);
            return ResponseEntity.ok(t);
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Student>> filterStudents(
            @RequestParam String std_class,
            @RequestParam String subject) {

        List<Student> list = ts.findByClassAndSubject(std_class, subject);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/updateMarks/{sub}")
    public ResponseEntity<?> updateMarks(@PathVariable String sub, @RequestBody Student std) {
        return ResponseEntity.ok(ts.updateMarks(std, sub));
    }
    
    @PutMapping("/updatePassword")
	public Teacher updatePassword(@RequestBody Teacher t) {
		return ts.updatePassword(t);
	}
}