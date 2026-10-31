
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Instructordashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (!user?.id || user.role !== "INSTRUCTOR") {
            navigate("/login", { replace: true });
            return;
        }

        loadData();
    }, [user?.id]);

    async function loadData() {
        try {
            const courseResponse = await axios.get(
                "http://localhost:8080/course"
            );

            const myCourses = courseResponse.data.filter(
                course => course.instructorId?.id === user.id
            );

            setCourses(myCourses);

            const enrollmentResponse = await axios.get(
                "http://localhost:8080/enrollment"
            );

            setEnrollments(
                enrollmentResponse.data.filter(enrollment =>
                    myCourses.some(course =>
                        course.id === enrollment.courseid?.id
                    )
                )
            );

            const assignmentResponse = await axios.get(
                "http://localhost:8080/assignment"
            );

            setAssignments(
                assignmentResponse.data.filter(assignment =>
                    myCourses.some(course =>
                        course.id === assignment.courseid?.id
                    )
                )
            );

            const submissionResponse = await axios.get(
                "http://localhost:8080/submission"
            );

            setSubmissions(
                submissionResponse.data.filter(submission =>
                    assignmentResponse.data.some(assignment =>
                        myCourses.some(course =>
                            course.id === assignment.courseid?.id
                        ) &&
                        assignment.id === submission.assignmentid?.id
                    )
                )
            );

        } catch (error) {
            console.log("Dashboard error:", error);
            alert("Unable to load dashboard data. Check the console.");
        }
    }

    function logout() {
        navigate("/login", { replace: true });
    }

    return (
        <div className="instructor-dashboard">
            <aside className="instructor-sidebar">
                <h3>LearnHub</h3>
                <p className="sidebar-label">INSTRUCTOR MENU</p>

                <Link to="/instructor-dashboard" state={{ user }}>
                    Dashboard
                </Link>

                <Link to="/course" state={{ user }}>Courses</Link>
                <Link to="/lesson" state={{ user }}>Lessons</Link>
                <Link to="/assignment" state={{ user }}>Assignments</Link>
                <Link to="/enrollment" state={{ user }}>Enrollments</Link>
                <Link to="/submission" state={{ user }}>Submissions</Link>

                <button onClick={logout} className="logout-button">
                    Logout
                </button>
            </aside>

            <main className="instructor-main">
                <header className="instructor-topbar">
                    <div>
                        <h4>Instructor Dashboard</h4>
                        <p>Manage your courses and students</p>
                    </div>

                    <div className="instructor-profile">
                        <span className="profile-circle">I</span>
                        <span>{user?.fullName || "Instructor"}</span>
                    </div>
                </header>

                <div className="instructor-content">
                    <div className="instructor-welcome">
                        <h2>Welcome back, {user?.fullName || "Instructor"}!</h2>
                        <p>Here is an overview of your teaching activities.</p>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-12 col-sm-6 col-xl-3">
                            <div
                                className="instructor-stat"
                                onClick={() => navigate("/mycourses", { state: { user } })}
                                style={{ cursor: "pointer" }}
                            >
                                <span>My Courses</span>
                                <h2>{courses.length}</h2>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div
                                className="instructor-stat"
                                onClick={() => navigate("/enrollment", { state: { user } })}
                                style={{ cursor: "pointer" }}
                            >
                                <span>Enrollments</span>
                                <h2>{enrollments.length}</h2>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div
                                className="instructor-stat"
                                onClick={() => navigate("/myassignment", { state: { user } })}
                                style={{ cursor: "pointer" }}
                            >
                                <span>Assignments</span>
                                <h2>{assignments.length}</h2>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div
                                className="instructor-stat"
                                onClick={() => navigate("/mysubmissions", { state: { user } })}
                                style={{ cursor: "pointer" }}
                            >
                                <span>Submissions</span>
                                <h2>{submissions.length}</h2>
                            </div>
                        </div>
                    </div>

                    

                    <section className="instructor-panel">
                        <h4>My Courses</h4>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.title}</td>
                                            <td>{course.category}</td>
                                            <td>{course.level}</td>
                                            <td>{course.status}</td>
                                        </tr>
                                    ))}

                                    {courses.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No courses found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Instructordashboard;
