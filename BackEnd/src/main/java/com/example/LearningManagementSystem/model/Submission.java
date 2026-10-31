package com.example.LearningManagementSystem.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.TypeAlias;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "assignment_id")
    @ManyToOne
    private Assignment assignmentid;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private User studentid;
    @Column(name = "answer_text")
    private String answertext;
    @Column(name = "submitted_at")
    private LocalDate submittedat;
    private String status;
    @Column(nullable = true)
    private Integer marks;
    @Column(nullable = true)
    private String  feedback;
    @Column(name = "graded_at",nullable = true)
    private LocalDate gradedat;

    public Submission() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Assignment getAssignmentid() {
        return assignmentid;
    }

    public void setAssignmentid(Assignment assignmentid) {
        this.assignmentid = assignmentid;
    }

    public User getStudentid() {
        return studentid;
    }

    public void setStudentid(User studentid) {
        this.studentid = studentid;
    }

    public String getAnswertext() {
        return answertext;
    }

    public void setAnswertext(String answertext) {
        this.answertext = answertext;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public String getFeedback() {
        return feedback;
    }

    public LocalDate getSubmittedat() {
        return submittedat;
    }

    public void setSubmittedat(LocalDate submittedat) {
        this.submittedat = submittedat;
    }

    public LocalDate getGradedat() {
        return gradedat;
    }

    public void setGradedat(LocalDate gradedat) {
        this.gradedat = gradedat;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    @PrePersist
    public void setDate(){
        submittedat=LocalDate.now();
    }
}
