
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function MyAssignments() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (!user?.id) {
            navigate("/login");
            return;
        }

        async function getAssignments() {
            try {
                const courseResponse = await axios.get(
                    "http://localhost:8080/course"
                );

                const myCourses = courseResponse.data.filter(
                    course => course.instructorId?.id === user.id
                );

                const assignmentResponse = await axios.get(
                    "http://localhost:8080/assignment"
                );

                const myAssignments = assignmentResponse.data.filter(
                    assignment => myCourses.some(
                        course => course.id === assignment.courseid?.id
                    )
                );

                setAssignments(myAssignments);

            } catch (error) {
                console.log(error);
            }
        }

        getAssignments();

    }, [user?.id]);

    return (
        <div className="container mt-4">

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/instructor-dashboard", { state: { user } })}
            >
                Back to Dashboard
            </button>

            <h3 className="mb-4">My Assignments</h3>

            <div className="row g-3">
                {assignments.length === 0 ? (
                    <p>No assignments found.</p>
                ) : (
                    assignments.map(assignment => (
                        <div className="col-md-4" key={assignment.id}>
                            <div className="card p-3 h-100">
                                <h5>{assignment.title}</h5>
                                <p>{assignment.description}</p>
                                <p>
                                    <strong>Course:</strong>{" "}
                                    {assignment.courseid?.title}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default MyAssignments;
