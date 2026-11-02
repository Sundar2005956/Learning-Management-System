
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

function Studentdashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = location.state?.user;

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id || user.role !== "STUDENT") {
            navigate("/login", { replace: true });
            return;
        }

        loadData();
    }, [user?.id]);

    async function loadData() {
        try {
            setLoading(true);

            const [courseRes, enrollmentRes, submissionRes] =
                await Promise.all([
                    axios.get("https://learning-management-system-q1rc.onrender.com/course"),
                    axios.get("https://learning-management-system-q1rc.onrender.com/enrollment"),
                    axios.get("https://learning-management-system-q1rc.onrender.com/submission")
                ]);

            setCourses(courseRes.data || []);

            setEnrollments(
                (enrollmentRes.data || []).filter(
                    e => e.studentid?.id === user.id
                )
            );

            setSubmissions(
                (submissionRes.data || []).filter(
                    s => s.studentid?.id === user.id
                )
            );
        } catch (error) {
            console.log("API Error:", error);
            console.log("Response:", error.response?.data);
            console.log("Status:", error.response?.status);
            alert("Check the browser console (F12).");
        } finally {
            setLoading(false);
        }
    }

    async function enroll(courseId) {
        if (!user?.id) {
            alert("Please log in first.");
            return;
        }

        const alreadyEnrolled = enrollments.some(
            e => e.courseid?.id === courseId
        );

        if (alreadyEnrolled) {
            alert("You are already enrolled in this course.");
            return;
        }

        try {
            await axios.post(
                `https://learning-management-system-q1rc.onrender.com/enrollment/${user.id}/${courseId}`,
                { status: "ENROLLED" }
            );

            alert("Enrolled successfully!");
            await loadData();
        } catch (error) {
            console.error("Enrollment failed:", error);
            alert(
                error.response?.data?.message ||
                "Enrollment failed. Please check your backend."
            );
        }
    }

    function logout() {
        navigate("/login", { replace: true });
    }

    if (!user) {
        return null;
    }

    return (
        <div className="student-dashboard">
            <nav className="student-navbar d-flex justify-content-between align-items-center px-4 py-3">
                <h3 className="mb-0">LearnHub</h3>

                <div className="d-flex align-items-center gap-3">
                    <span>Student Portal</span>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container-fluid dashboard-content p-4">
                <div className="welcome-section mb-4">
                    <h2>
                        Welcome, {user.fullName || "Student"}!
                    </h2>
                    <p>
                        Continue learning and track your progress.
                    </p>
                </div>

                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-4">
                        <div className="summary-card p-4">
                            <h5>Available Courses</h5>
                            <h2>{courses.length}</h2>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="summary-card p-4">
                            <h5>My Enrollments</h5>
                            <h2>{enrollments.length}</h2>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="summary-card p-4">
                            <h5>My Submissions</h5>
                            <h2>{submissions.length}</h2>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p>Loading dashboard...</p>
                ) : (
                    <>
                        <section className="dashboard-section mb-5">
                            <h4 className="mb-3">Available Courses</h4>

                            <div className="row g-3">
                                {courses.length === 0 ? (
                                    <p>No courses available.</p>
                                ) : (
                                    courses.map(course => {
                                        const isEnrolled = enrollments.some(
                                            e => e.courseid?.id === course.id
                                        );

                                        return (
                                            <div
                                                className="col-12 col-md-6 col-xl-4"
                                                key={course.id}
                                            >
                                                <div className="course-card card h-100 p-3">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            {course.title}
                                                        </h5>

                                                        <p className="card-text">
                                                            {course.description}
                                                        </p>

                                                        <p>
                                                            <strong>Category:</strong>{" "}
                                                            {course.category}
                                                        </p>

                                                        <p>
                                                            <strong>Level:</strong>{" "}
                                                            {course.level}
                                                        </p>

                                                        <button
                                                            className="btn btn-primary w-100"
                                                            disabled={isEnrolled}
                                                            onClick={() =>
                                                                enroll(course.id)
                                                            }
                                                        >
                                                            {isEnrolled
                                                                ? "Already Enrolled"
                                                                : "Enroll Now"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        <section className="dashboard-section mb-5">
                            <h4 className="mb-3">My Enrollments</h4>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {enrollments.length === 0 ? (
                                            <tr>
                                                <td colSpan="2">
                                                    No enrollments yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            enrollments.map(e => (
                                                <tr key={e.id}>
                                                    <td>
                                                        {e.courseid?.title ||
                                                            e.courseid?.id}
                                                    </td>
                                                    <td>{e.status}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="dashboard-section mb-4">
                            <h4 className="mb-3">My Submissions</h4>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>Assignment</th>
                                            <th>Status</th>
                                            <th>Marks</th>
                                            <th>Feedback</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {submissions.length === 0 ? (
                                            <tr>
                                                <td colSpan="4">
                                                    No submissions yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            submissions.map(s => (
                                                <tr key={s.id}>
                                                    <td>
                                                        {s.assignmentid?.title ||
                                                            s.assignmentid?.id}
                                                    </td>
                                                    <td>{s.status}</td>
                                                    <td>{s.marks ?? "-"}</td>
                                                    <td>{s.feedback || "-"}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default Studentdashboard;
