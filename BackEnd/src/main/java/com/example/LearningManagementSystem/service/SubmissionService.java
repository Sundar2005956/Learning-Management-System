package com.example.LearningManagementSystem.service;

import com.example.LearningManagementSystem.model.Assignment;
import com.example.LearningManagementSystem.model.Submission;
import com.example.LearningManagementSystem.model.User;
import com.example.LearningManagementSystem.repo.IAssignmentRepo;
import com.example.LearningManagementSystem.repo.ISubmissionRepo;
import com.example.LearningManagementSystem.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SubmissionService
{
    @Autowired
    ISubmissionRepo submissionRepo;
    @Autowired
    IAssignmentRepo assignmentRepo;
    @Autowired
    IUserRepo userRepo;
    public List<Submission> getData(){
        return submissionRepo.findAll();
    }
    public Submission addData(Long assignmentId,Long userId, Submission submission){
       Assignment assignment=assignmentRepo.findById(assignmentId).orElseThrow(()->new RuntimeException("Invalid"));
       User student=userRepo.findById(userId).orElseThrow(()->new RuntimeException("Invalid"));
       submission.setAssignmentid(assignment);
       submission.setStudentid(student);
       submission.setStatus("SUBMITTED");
       submission.setMarks(null);
       submission.setGradedat(null);
       submission.setFeedback(null);
       return submissionRepo.save(submission);
    }
    public Submission updateData(Long id,Submission submission){
        Submission existing =submissionRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
        existing.setGradedat(LocalDate.now());
        existing.setFeedback(submission.getFeedback());
        existing.setStatus("GRADED");
        existing.setMarks(submission.getMarks());
        return submissionRepo.save(existing);
    }
    public Submission getById(Long id){
        return submissionRepo.findById(id).orElseThrow(()->new RuntimeException("Invalid"));
    }
}
