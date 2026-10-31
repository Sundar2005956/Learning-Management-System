package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.User;
import com.example.LearningManagementSystem.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
     {
         @Autowired
         IUserRepo userRepo;

         public User register(User user){
             String role=user.getRole().toUpperCase();

             if(!role.equals("STUDENT") && !role.equals("INSTRUCTOR"))
             {
                 throw new RuntimeException("Invalid");
             }
             if(userRepo.existsByEmail(user.getEmail())){
                 throw new RuntimeException("Email already exists");
             }

             user.setRole(role);
             return userRepo.save(user);
         }
         public List<User> getData(){
             return userRepo.findAll();
         }

         public User getById(Long id){
           return userRepo.findById(id).orElse(null);

         }
         public User updateUser(User user,Long id){
             User existing=userRepo.findById(id).orElseThrow(()->new RuntimeException("no id found"+id));
             existing.setFullName(user.getFullName());
             existing.setEmail(user.getEmail());
             existing.setPassword(user.getPassword());
             existing.setRole(user.getRole());
             return userRepo.save(existing);
         }
         public User login(String email,String password){
             User exist=userRepo.findByEmail(email);
             if(exist==null)
             {
                 throw new RuntimeException("Please Enter correct details");
             }
             if(!exist.getPassword().equals(password)){
                 throw new RuntimeException("Please Enter correct details");
             }
             return exist;
         }
     }
