package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Enrollment;
import com.example.LearningManagementSystem.model.Lesson;
import com.example.LearningManagementSystem.model.LessonProgress;
import com.example.LearningManagementSystem.repo.IEnrollmentRepo;
import com.example.LearningManagementSystem.repo.ILessonProgressRepo;
import com.example.LearningManagementSystem.repo.ILessonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonProgressService {
    @Autowired
    ILessonProgressRepo lessonProgressRepo;
    @Autowired
    IEnrollmentRepo enrollmentRepo;
    @Autowired
    ILessonRepo lessonRepo;

    public List<LessonProgress> getData(){
        return lessonProgressRepo.findAll();
    }
    public LessonProgress addData(Long lessonId,Long enrollmentId,LessonProgress lessonProgress){
        Lesson lession=lessonRepo.findById(lessonId).orElseThrow(()->new RuntimeException("Invalid"));
        Enrollment enrollment=enrollmentRepo.findById(enrollmentId).orElseThrow(()->new RuntimeException("Invalid"));
        lessonProgress.setLessonid(lession);
        lessonProgress.setEnrollmentid(enrollment);
        return lessonProgressRepo.save(lessonProgress);
    }
    public LessonProgress getById(Long id){
        return lessonProgressRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
    }
}
