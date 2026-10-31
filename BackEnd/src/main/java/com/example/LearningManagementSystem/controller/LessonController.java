package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Lesson;
import com.example.LearningManagementSystem.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class LessonController {
    @Autowired
    LessonService lessonservice;

    @GetMapping("/lesson")
    public List<Lesson> getData(){
        return lessonservice.getData();
    }

    @PostMapping("/lesson/{courseId}")
    public Lesson addData(@RequestBody Lesson lesson,@PathVariable Long courseId){
        return lessonservice.addData(lesson,courseId);
    }
    @PutMapping("/lessonUpdate/{courseId}")
    public Lesson updateData(@RequestBody Lesson lesson,@PathVariable Long courseId){
        return lessonservice.updateData(lesson,courseId);
    }
    @GetMapping("/lessonUpdate/{id}")
    public Lesson getById(@PathVariable Long id){
        return lessonservice.getById(id);
    }
}
