package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.model.User;
import com.example.LearningManagementSystem.repo.ICourseRepo;
import com.example.LearningManagementSystem.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    ICourseRepo courserepo;
    @Autowired
    IUserRepo userrepo;

    public List<Course> getData(){
     return courserepo.findAll();
    }

    public Course addData(Course course,Long instructorid){
        User instructor=userrepo.findById(instructorid)
                .orElseThrow(()->new RuntimeException("invalid"));
        if(!instructor.getRole().equals("INSTRUCTOR"))
        {
            throw new RuntimeException("Only Instructor should create");
        }
       course.setInstructorId(instructor);
        return courserepo.save(course);
    }
    public Course updateData(Long id,Course course){
           Course existing=courserepo.findById(id).orElseThrow(()->new RuntimeException("id not matching"));
           existing.setDescription(course.getDescription());
        existing.setCategory(course.getCategory());
        existing.setLevel(course.getLevel());
        existing.setMaxCapacity(course.getMaxCapacity());
        existing.setTitle(course.getTitle());
        existing.setStatus(course.getStatus());

           return courserepo.save(existing);
    }
    public Course getById(Long id){
        return courserepo.findById(id).orElseThrow(()->new RuntimeException("invalid"+id));
    }
}
