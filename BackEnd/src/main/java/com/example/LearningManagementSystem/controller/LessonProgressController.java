package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Enrollment;
import com.example.LearningManagementSystem.model.LessonProgress;
import com.example.LearningManagementSystem.service.LessonProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class LessonProgressController {
    @Autowired
    LessonProgressService lessonProgressService;

    @GetMapping("/lessonProgress")
    public List<LessonProgress> getData(){
        return lessonProgressService.getData();
    }

    @PostMapping("/lessonProgress/{lessionId}/{enrollmentId}")
    public LessonProgress addData(@PathVariable Long lessionId, @PathVariable Long enrollmentId, @RequestBody LessonProgress lessonProgress){
        return lessonProgressService.addData(lessionId,enrollmentId,lessonProgress);
    }
    @GetMapping("/lessonProgress/{id}")
    public LessonProgress getById(@PathVariable Long id){
        return lessonProgressService.getById(id);
    }
}
