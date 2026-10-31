package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Course;
import com.example.LearningManagementSystem.model.Lesson;
import com.example.LearningManagementSystem.repo.ICourseRepo;
import com.example.LearningManagementSystem.repo.ILessonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    @Autowired
    ILessonRepo lessonrepo;
    @Autowired
    ICourseRepo courserepo;

    public List<Lesson> getData(){
        return lessonrepo.findAll();
    }

    public Lesson addData(Lesson lesson,Long courseId){
        Course data=courserepo.findById(courseId).orElseThrow(()->new RuntimeException("Invalid"));
        lesson.setCourseid(data);
        return lessonrepo.save(lesson);
    }

    public Lesson updateData(Lesson lesson,Long courseId){
      Lesson existing= lessonrepo.findById(courseId).orElseThrow(()->new RuntimeException("invalid"));
        existing.setTitle(lesson.getTitle());
        existing.setContent(lesson.getContent());
        existing.setLessonorder(lesson.getLessonorder());
        existing.setTitle(lesson.getTitle());
       return lessonrepo.save(existing);
    }
    public Lesson getById(Long id){
        return lessonrepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
    }
}
