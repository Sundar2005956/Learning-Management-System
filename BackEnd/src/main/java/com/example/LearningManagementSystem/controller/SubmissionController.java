package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Submission;
import com.example.LearningManagementSystem.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {
    @Autowired
    SubmissionService submissionService;

    @GetMapping("/submission")
    public List<Submission> getData(){
        return submissionService.getData();
    }

    @PostMapping("/submission/{userId}/{assignmentId}")
    public Submission addData(@PathVariable Long assignmentId,@PathVariable Long userId,@RequestBody Submission submission){
        return submissionService.addData(assignmentId,userId,submission);
    }
    @PutMapping("/submissionUpdate/{id}")
    public Submission updateData(@PathVariable Long id,@RequestBody Submission submission){
        return submissionService.updateData(id,submission);
    }

    @GetMapping("/submissionUpdate/{id}")
    public Submission getById(@PathVariable Long id){
        return submissionService.getById(id);
    }
}
