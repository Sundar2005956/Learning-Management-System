package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILessonRepo extends JpaRepository<Lesson,Long> {
}
