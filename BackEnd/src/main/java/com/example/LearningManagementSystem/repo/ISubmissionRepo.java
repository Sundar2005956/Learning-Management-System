package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISubmissionRepo extends JpaRepository<Submission,Long> {
}
