package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Assignment;
import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.repo.IAssignmentRepo;
import com.example.LearningManagementSystem.repo.ICourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {
    @Autowired
    IAssignmentRepo assignmentRepo;
    @Autowired
    ICourseRepo courseRepo;

    public List<Assignment> getData(){
        return assignmentRepo.findAll();
    }
    public Assignment addData(Long courseId,Assignment assignment){
        Course course=courseRepo.findById(courseId).orElseThrow(()->new RuntimeException("Invalid"));
        assignment.setCourseid(course);
        return assignmentRepo.save(assignment);
    }
    public Assignment updateData(Assignment assignment,Long id){
       Assignment existing=assignmentRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
       existing.setTitle(assignment.getTitle());
       existing.setDescription(assignment.getDescription());
       existing.setMaxmarks(assignment.getMaxmarks());
       existing.setDuedate(assignment.getDuedate());
       return assignmentRepo.save(existing);
    }
    public Assignment getById(Long id){
        return assignmentRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
    }
}
