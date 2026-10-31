package com.example.LearningManagementSystem.controller;

import com.example.LearningManagementSystem.model.User;
import com.example.LearningManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }


    @GetMapping("/userlist")
    public List<User> getData(){
        return userService.getData();
    }


    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody User user,@PathVariable Long id){
       return userService.updateUser(user,id);
    }
    @GetMapping("/user/{id}")
    public User getById(@PathVariable Long id){
        return userService.getById(id);
    }
    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user.getEmail(),user.getPassword());
    }
}
