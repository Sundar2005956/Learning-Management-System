package com.example.LearningManagementSystem.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "lesson_progress")
public class LessonProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "enrollment_id")
    @ManyToOne
    private Enrollment enrollmentid;
    @JoinColumn(name = "lesson_id")
    @ManyToOne
    private Lesson lessonid;
    @Column(name = "completed_at")
    private LocalDateTime completedate;


    public LessonProgress() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCompletedate() {
        return completedate;
    }

    public void setCompletedat(LocalDateTime completedate) {
        this.completedate = completedate;
    }

    public Lesson getLessonid() {
        return lessonid;
    }

    public void setLessonid(Lesson lessonid) {
        this.lessonid = lessonid;
    }

    public Enrollment getEnrollmentid() {
        return enrollmentid;
    }

    public void setEnrollmentid(Enrollment enrollmentid) {
        this.enrollmentid = enrollmentid;
    }
    @PrePersist
    public void setDate(){
        completedate=LocalDateTime.now();
    }


}
