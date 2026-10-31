package com.example.LearningManagementSystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course courseid;
    private String title;
    private String content;
    @Column(name = "lesson_order")
    private int lessonorder;
    @Column(name = "duration_minutes")
    private int durationminutes;

    public Lesson() {
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLessonorder() {
        return lessonorder;
    }

    public void setLessonorder(int lessonorder) {
        this.lessonorder = lessonorder;
    }

    public int getDurationminutes() {
        return durationminutes;
    }

    public void setDurationminutes(int durationminutes) {
        this.durationminutes = durationminutes;
    }
}
