package com.example.LearningManagementSystem.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "course_id")
    @OneToOne
    private Course courseid;
    private String title;
    private String description;
    @Column(name = "max_marks")
    private int maxmarks;
    @Column(name = "due_date")
    private LocalDate duedate;
    @Column(name = "created_at")
    private LocalDateTime createdat;


    public Assignment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourseid() {
        return courseid;
    }

    public void setCourseid(Course courseid) {
        this.courseid = courseid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMaxmarks() {
        return maxmarks;
    }

    public void setMaxmarks(int maxmarks) {
        this.maxmarks = maxmarks;
    }

    public LocalDate getDuedate() {
        return duedate;
    }

    public void setDuedate(LocalDate duedate) {
        this.duedate = duedate;
    }

    public LocalDateTime getCreatedat() {
        return createdat;
    }

    public void setCreatedat(LocalDateTime createdat) {
        this.createdat = createdat;
    }

    @PrePersist
    public void setDate(){
        createdat=LocalDateTime.now();
    }

}
