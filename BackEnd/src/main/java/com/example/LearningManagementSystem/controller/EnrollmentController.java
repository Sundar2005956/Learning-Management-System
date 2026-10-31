package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Enrollment;
import com.example.LearningManagementSystem.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {
    @Autowired
    EnrollmentService enrollmentService;

    @GetMapping("/enrollment")
    public List<Enrollment> getData(){
        return enrollmentService.getData();
    }
    @PostMapping("/enrollment/{userId}/{courseId}")
    public Enrollment addData( @PathVariable Long userId,@PathVariable Long courseId, @RequestBody Enrollment enrollment){
        return enrollmentService.addData(userId,courseId,enrollment);
    }
    @PutMapping("/enrollmentupdate/{id}")
    public Enrollment updateData(@PathVariable Long id,@RequestBody Enrollment enrollment){
        return enrollmentService.updateData(id,enrollment);
    }

}
