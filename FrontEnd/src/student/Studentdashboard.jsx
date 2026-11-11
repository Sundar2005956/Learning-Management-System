import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API = "https://learning-management-system-production-ca71752e.up.railway.app";

function StudentDashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = location.state?.user;

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        loadStudentData();
    }, [user?.id]);

    const loadStudentData = async () => {
        try {
            setLoading(true);

            const [courseRes, enrollmentRes, assignmentRes, submissionRes] =
                await Promise.all([
                    axios.get(`${API}/course`),
                    axios.get(`${API}/enrollment`),
                    axios.get(`${API}/assignment`),
                    axios.get(`${API}/submission`)
                ]);

            const allCourses = Array.isArray(courseRes.data)
                ? courseRes.data : [];

            const allEnrollments = Array.isArray(enrollmentRes.data)
                ? enrollmentRes.data : [];

            const allAssignments = Array.isArray(assignmentRes.data)
                ? assignmentRes.data : [];

            const allSubmissions = Array.isArray(submissionRes.data)
                ? submissionRes.data : [];

            const studentEnrollments = allEnrollments.filter(
                (e) => Number(e.studentid?.id) === Number(user.id)
            );

            const enrolledCourseIds = studentEnrollments.map(
                (e) => Number(e.courseid?.id)
            );

            const studentAssignments = allAssignments.filter(
                (a) => enrolledCourseIds.includes(Number(a.courseid?.id))
            );

            const studentSubmissions = allSubmissions.filter(
                (s) => Number(s.studentid?.id) === Number(user.id)
            );

            setCourses(allCourses);
            setEnrollments(studentEnrollments);
            setAssignments(studentAssignments);
            setSubmissions(studentSubmissions);

        } catch (error) {
            console.error("Error loading student data:", error);
            alert("Unable to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isEnrolled = (courseId) => {
        return enrollments.some(
            (e) => Number(e.courseid?.id) === Number(courseId)
        );
    };

    const enrollCourse = async (courseId) => {
        try {
            await axios.post(
                `${API}/enrollment/${user.id}/${courseId}`
            );

            alert("Successfully enrolled!");
            loadStudentData();

        } catch (error) {
            console.error("Enrollment error:", error);
            alert("Unable to enroll. You may already be enrolled.");
        }
    };

    const submitAssignment = async (assignmentId) => {
        const answer = answers[assignmentId];

        if (!answer || !answer.trim()) {
            alert("Please enter your answer.");
            return;
        }

        try {
            await axios.post(
                `${API}/submission/${user.id}/${assignmentId}`,
                { answer: answer }
            );

            alert("Assignment submitted successfully!");

            setAnswers((prev) => ({
                ...prev,
                [assignmentId]: ""
            }));

            loadStudentData();

        } catch (error) {
            console.error("Submission error:", error);
            alert("Unable to submit assignment. Please try again.");
        }
    };

    const logout = () => {
        navigate("/login");
    };

    if (!user?.id) {
        return (
            <div className="container mt-5 text-center">
                <h3>Please login again</h3>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>Loading Student Dashboard...</h4>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-light min-vh-100 p-4">

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded px-3 mb-4">
                <span className="navbar-brand fw-bold">
                    LearnHub - Student
                </span>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <span className="text-white">
                        {user.fullName}
                    </span>

                    <button
                        className="btn btn-light btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Welcome */}
            <div className="mb-4">
                <h2>Welcome, {user.fullName}!</h2>
                <p className="text-muted">
                    Continue learning and track your progress.
                </p>
            </div>

            {/* Statistics */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="text-muted">Available Courses</h6>
                        <h2>{courses.length}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="text-muted">My Enrollments</h6>
                        <h2>{enrollments.length}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3">
                        <h6 className="text-muted">My Submissions</h6>
                        <h2>{submissions.length}</h2>
                    </div>
                </div>
            </div>

            {/* Available Courses */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4 className="mb-3">Available Courses</h4>

                    <div className="row g-3">
                        {courses.length === 0 ? (
                            <p>No courses available.</p>
                        ) : (
                            courses.map((course) => (
                                <div className="col-md-4" key={course.id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5>{course.title}</h5>

                                            <p>{course.description}</p>

                                            <p>
                                                <strong>Category:</strong>{" "}
                                                {course.category}
                                            </p>

                                            <p>
                                                <strong>Level:</strong>{" "}
                                                {course.level}
                                            </p>

                                            {isEnrolled(course.id) ? (
                                                <button
                                                    className="btn btn-success"
                                                    disabled
                                                >
                                                    Enrolled
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        enrollCourse(course.id)
                                                    }
                                                >
                                                    Enroll Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* My Enrollments */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4 className="mb-3">My Enrollments</h4>

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {enrollments.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No enrollments yet.
                                        </td>
                                    </tr>
                                ) : (
                                    enrollments.map((enrollment) => (
                                        <tr key={enrollment.id}>
                                            <td>{enrollment.courseid?.id}</td>
                                            <td>
                                                {enrollment.courseid?.title || "Course"}
                                            </td>
                                            <td>
                                                <span className="badge bg-success">
                                                    Enrolled
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Assignments */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4 className="mb-3">Available Assignments</h4>

                    {assignments.length === 0 ? (
                        <p>No assignments available for your enrolled courses.</p>
                    ) : (
                        assignments.map((assignment) => {
                            const alreadySubmitted = submissions.some(
                                (s) =>
                                    Number(s.assignmentid?.id) ===
                                    Number(assignment.id)
                            );

                            return (
                                <div
                                    className="border rounded p-3 mb-3"
                                    key={assignment.id}
                                >
                                    <h5>
                                        {assignment.title || "Assignment"}
                                    </h5>

                                    <p>
                                        {assignment.description}
                                    </p>

                                    <p>
                                        <strong>Due Date:</strong>{" "}
                                        {assignment.dueDate || "Not specified"}
                                    </p>

                                    {alreadySubmitted ? (
                                        <span className="badge bg-success">
                                            Submitted
                                        </span>
                                    ) : (
                                        <>
                                            <textarea
                                                className="form-control mb-3"
                                                rows="4"
                                                placeholder="Enter your assignment answer..."
                                                value={answers[assignment.id] || ""}
                                                onChange={(e) =>
                                                    setAnswers((prev) => ({
                                                        ...prev,
                                                        [assignment.id]: e.target.value
                                                    }))
                                                }
                                            />

                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    submitAssignment(assignment.id)
                                                }
                                            >
                                                Submit Assignment
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* My Submissions */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4 className="mb-3">My Submissions</h4>

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Assignment</th>
                                    <th>Answer</th>
                                    <th>Status</th>
                                    <th>Marks</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>

                            <tbody>
                                {submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No submissions yet.
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map((submission) => (
                                        <tr key={submission.id}>
                                            <td>
                                                {submission.assignmentid?.title ||
                                                    submission.assignmentid?.id}
                                            </td>

                                            <td>{submission.answer}</td>

                                            <td>
                                                {submission.status || "Pending"}
                                            </td>

                                            <td>
                                                {submission.marks ?? "-"}
                                            </td>

                                            <td>
                                                {submission.feedback || "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StudentDashboard;