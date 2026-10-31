
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Enrollment() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id || user.role !== "INSTRUCTOR") {
            navigate("/login");
            return;
        }

        loadEnrollments();
    }, []);

    async function loadEnrollments() {
        try {
            const courseResponse = await axios.get(
                "http://localhost:8080/course"
            );

            // Get only courses created by this instructor
            const myCourses = courseResponse.data.filter(
                course => course.instructorId?.id === user.id
            );

            setCourses(myCourses);

            const enrollmentResponse = await axios.get(
                "http://localhost:8080/enrollment"
            );

            // Get enrollments belonging to this instructor's courses
            const myEnrollments = enrollmentResponse.data.filter(
                enrollment =>
                    myCourses.some(
                        course => course.id === enrollment.courseid?.id
                    )
            );

            setEnrollments(myEnrollments);
        } catch (error) {
            console.error("Error loading enrollments:", error);
            alert("Failed to load enrollment details.");
        } finally {
            setLoading(false);
        }
    }

    function getStudentCount(courseId) {
        return enrollments.filter(
            enrollment => enrollment.courseid?.id === courseId
        ).length;
    }

    if (loading) {
        return <div className="container mt-4">Loading enrollments...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Student Enrollments</h2>
                    <p className="text-muted">
                        View students enrolled in your courses.
                    </p>
                </div>

                <Link
                    to="/instructor-dashboard"
                    state={{ user }}
                    className="btn btn-outline-primary"
                >
                    Back to Dashboard
                </Link>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5>Total Enrollments</h5>
                    <h2>{enrollments.length}</h2>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Students Enrolled</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.title}</td>
                                    <td>
                                        <span className="badge bg-primary">
                                            {getStudentCount(course.id)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    You haven't created any courses yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Enrollment;
