
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function MyCourses() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user?.id) {
            navigate("/login");
            return;
        }

        axios.get("https://learning-management-system-production-ca71752e.up.railway.app/course")
            .then(response => {
                const myCourses = response.data.filter(
                    course => course.instructorId?.id === user.id
                );

                setCourses(myCourses);
            })
            .catch(error => {
                console.log(error);
            });

    }, [user?.id]);

    return (
        <div className="container mt-4">

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/instructor-dashboard", { state: { user } })}
            >
                Back to Dashboard
            </button>

            <h3 className="mb-4">My Courses</h3>

            <div className="row g-3">

                {courses.length === 0 ? (
                    <p>No courses found.</p>
                ) : (
                    courses.map(course => (
                        <div className="col-md-4" key={course.id}>

                            <div className="card p-3 h-100">

                                <h5>{course.title}</h5>

                                <p>{course.description}</p>

                                <p>
                                    <strong>Category:</strong> {course.category}
                                </p>

                                <p>
                                    <strong>Level:</strong> {course.level}
                                </p>

                                <p>
                                    <strong>Status:</strong> {course.status}
                                </p>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default MyCourses;
