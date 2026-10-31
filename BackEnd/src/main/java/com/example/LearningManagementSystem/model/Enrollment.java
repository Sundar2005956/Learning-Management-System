package com.example.LearningManagementSystem.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "student_id")
    private User studentid;
    @OneToOne
    @JoinColumn(name = "course_id")
    private Course courseid;
    private String status;
    @Column(name = "enrolled_at")
    private LocalDateTime enrolledat;
    @Column(name = "completed_at")
    private LocalDateTime completedat;

    public Enrollment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getEnrolledat() {
        return enrolledat;
    }

    public void setEnrolledat(LocalDateTime enrolledat) {
        this.enrolledat = enrolledat;
    }

    public LocalDateTime getCompletedat() {
        return completedat;
    }

    public void setCompletedat(LocalDateTime completedat) {
        this.completedat = completedat;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Course getCourseid() {
        return courseid;
    }

    public void setCourseid(Course courseid) {
        this.courseid = courseid;
    }

    public User getStudentid() {
        return studentid;
    }

    public void setStudentid(User studentid) {
        this.studentid = studentid;
    }

    @PrePersist
    public void setDate(){
        enrolledat=LocalDateTime.now();
        completedat=LocalDateTime.now();
    }

}
