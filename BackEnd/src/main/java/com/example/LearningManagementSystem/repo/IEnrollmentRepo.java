package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEnrollmentRepo extends JpaRepository<Enrollment,Long> {
}
