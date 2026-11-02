
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function MySubmissions() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (!user?.id) {
            navigate("/login");
            return;
        }

        async function getSubmissions() {
            try {
                const courseResponse = await axios.get(
                    "https://learning-management-system-q1rc.onrender.com/course"
                );

                const myCourses = courseResponse.data.filter(
                    course => course.instructorId?.id === user.id
                );

                const assignmentResponse = await axios.get(
                    "https://learning-management-system-q1rc.onrender.com/assignment"
                );

                const myAssignments = assignmentResponse.data.filter(
                    assignment => myCourses.some(
                        course => course.id === assignment.courseid?.id
                    )
                );

                const submissionResponse = await axios.get(
                    "https://learning-management-system-q1rc.onrender.com/submission"
                );

                const mySubmissions = submissionResponse.data.filter(
                    submission => myAssignments.some(
                        assignment => assignment.id === submission.assignmentid?.id
                    )
                );

                setSubmissions(mySubmissions);

            } catch (error) {
                console.log(error);
            }
        }

        getSubmissions();

    }, [user?.id]);

    return (
        <div className="container mt-4">

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/instructor-dashboard", { state: { user } })}
            >
                Back to Dashboard
            </button>

            <h3 className="mb-4">Student Submissions</h3>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Assignment</th>
                            <th>Answer</th>
                            <th>Status</th>
                            <th>Marks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.map(submission => (
                            <tr key={submission.id}>
                                <td>
                                    {submission.studentid?.fullName ||
                                     submission.studentid?.email || "-"}
                                </td>
                                <td>{submission.assignmentid?.title || "-"}</td>
                                <td>{submission.answer || "-"}</td>
                                <td>{submission.status || "Submitted"}</td>
                                <td>{submission.marks ?? "-"}</td>
                            </tr>
                        ))}

                        {submissions.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No submissions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default MySubmissions;
