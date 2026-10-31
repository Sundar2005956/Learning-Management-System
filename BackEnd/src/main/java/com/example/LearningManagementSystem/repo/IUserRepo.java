package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<User,Long> {

    boolean existsByEmail(String email);
    boolean existsByRole(String role);
    User findByEmail(String email);

}
