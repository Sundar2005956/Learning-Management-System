package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.model.Enrollment;
import com.example.LearningManagementSystem.model.User;
import com.example.LearningManagementSystem.repo.ICourseRepo;
import com.example.LearningManagementSystem.repo.IEnrollmentRepo;
import com.example.LearningManagementSystem.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    IEnrollmentRepo enrollmentRepo;
    @Autowired
    ICourseRepo courserepo;
    @Autowired
    IUserRepo userrepo;

    public List<Enrollment> getData(){
        return enrollmentRepo.findAll();
    }

    public Enrollment addData(Long userId,Long courseId,Enrollment enrollment){
           Course courseid=courserepo.findById(courseId).orElseThrow(()->new RuntimeException("Invalid"));
        enrollment.setCourseid(courseid);
        User userid=userrepo.findById(userId).orElseThrow(()->new RuntimeException("Invalid"));
        enrollment.setStudentid(userid);

        return enrollmentRepo.save(enrollment);
    }
    public Enrollment updateData(Long id,Enrollment enrollment){
       Enrollment existing=enrollmentRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
       existing.setStatus(enrollment.getStatus());
       return enrollmentRepo.save(existing);
    }
}
