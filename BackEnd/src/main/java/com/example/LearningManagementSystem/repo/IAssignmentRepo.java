package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAssignmentRepo extends JpaRepository<Assignment,Long> {
}
