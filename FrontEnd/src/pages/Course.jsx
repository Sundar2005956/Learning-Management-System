
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Course() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the logged-in instructor
    const user = location.state?.user;

    const [course, setCourse] = useState({
        title: "",
        description: "",
        category: "",
        level: "BEGINNER",
        maxCapacity: 30,
        status: "DRAFT"
    });

    function handleChange(e) {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user?.id) {
            alert("Instructor information not found. Please log in again.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                `https://learning-management-system-q1rc.onrender.com/course/${user.id}`,
                {
                    ...course,
                    maxCapacity: Number(course.maxCapacity)
                }
            );
           

            alert("Course created successfully!");
             setCourse({
              title: "",
        description: "",
        category: "",
        level: "BEGINNER",
        maxCapacity: 30,
        status: "DRAFT"
            })
            navigate("/instructor-dashboard", {
    state: { user }
});
        } catch (error) {
            console.error(error);
            alert("Failed to create course.");
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2>Create Course</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Course Title</label>
                    <input
                        className="form-control"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Programming">Programming</option>
                        <option value="Database">Database</option>
                        <option value="Web">Web Development</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Level</label>
                    <select
                        className="form-select"
                        name="level"
                        value={course.level}
                        onChange={handleChange}
                    >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Maximum Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="maxCapacity"
                        min="1"
                        value={course.maxCapacity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Create Course
                </button>
            </form>
        </div>
    );
}

export default Course;
