package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    CourseService courseService;
    @GetMapping("/course")
    public List<Course> getData(){
        return courseService.getData();
    }

    @PostMapping("/course/{instructorid}")
    public Course addData(@RequestBody Course course, @PathVariable Long instructorid){
        return courseService.addData(course,instructorid);
    }

    @PutMapping("/courseUpdate/{id}")
    public Course updateData(@PathVariable Long id,@RequestBody Course course){
        return courseService.updateData(id,course);
    }
    @GetMapping("/courseUpdate/{id}")
    public Course getById(@PathVariable Long id){
        return courseService.getById(id);
    }
}
