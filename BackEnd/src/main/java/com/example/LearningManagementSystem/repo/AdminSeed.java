package com.example.LearningManagementSystem.repo;

import com.example.LearningManagementSystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminSeed implements CommandLineRunner {


    public AdminSeed(IUserRepo userRepo) {
        this.userRepo = userRepo;
    }


  private final   IUserRepo userRepo;
    @Override
   public void run(String...args){
        if(!userRepo.existsByRole("ADMIN"))
        {
            User user=new User();
            user.setFullName("Admin");
            user.setEmail("admin@learnhub.com");
            user.setPassword("Admin@123");
            user.setRole("ADMIN");
            user.setCreatedAt(java.time.LocalDateTime.now());
            userRepo.save(user);
        }
    }
}
