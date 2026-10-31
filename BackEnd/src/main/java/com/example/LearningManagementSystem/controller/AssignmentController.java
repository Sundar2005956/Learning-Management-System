package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Assignment;
import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class AssignmentController {
    @Autowired
    AssignmentService assignmentService;

    @GetMapping("/assignment")
    public List<Assignment> addData(){
        return assignmentService.getData();
    }

    @PostMapping("/assignment/{courseId}")
    public Assignment addData(@PathVariable Long courseId, @RequestBody Assignment assignment){
        return assignmentService.addData(courseId,assignment);
    }
    @PutMapping("/assignmentupdate/{id}")
    public Assignment updateData(@RequestBody Assignment assignment,@PathVariable Long id){
        return assignmentService.updateData(assignment,id);
    }
    @GetMapping("/assignmentupdate/{id}")
    public Assignment getById(@PathVariable Long id){
        return assignmentService.getById(id);
    }
}
