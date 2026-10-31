
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Assignment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = state?.user;

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/course")
            .then(res => setCourses(res.data))
            .catch(console.error);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user?.id) {
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/assignment/${courseId}`,
                { title, description }
            );
            alert("Assignment created successfully!");
            setTitle("");
            setDescription("");
            setCourseId("");
            navigate("/instructor-dashboard", {
    state: { user }
});
        } catch (error) {
            console.error(error);
            alert("Failed to create assignment.");
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2>Create Assignment</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Select Course</label>
                <select className="form-select mb-3" value={courseId}
                    onChange={e => setCourseId(e.target.value)} required>
                    <option value="">Choose a course</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>

                <input className="form-control mb-3" placeholder="Assignment title"
                    value={title} onChange={e => setTitle(e.target.value)} required />

                <textarea className="form-control mb-3" placeholder="Description"
                    value={description} onChange={e => setDescription(e.target.value)} required />

                <button className="btn btn-primary">Create Assignment</button>
            </form>
        </div>
    );
}

export default Assignment;
