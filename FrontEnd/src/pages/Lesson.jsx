
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Lesson() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = state?.user;

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get("https://learning-management-system-q1rc.onrender.com/course")
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
                `https://learning-management-system-q1rc.onrender.com/lesson/${courseId}`,
                { title, content }
            );
            alert("Lesson created successfully!");
            setTitle("");
            setContent("");
            setCourseId("");
            navigate("/instructor-dashboard", {
    state: { user }
});
        } catch (error) {
            console.error(error);
            alert("Failed to create lesson.");
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2>Create Lesson</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Select Course</label>
                <select className="form-select mb-3" value={courseId}
                    onChange={e => setCourseId(e.target.value)} required>
                    <option value="">Choose a course</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>

                <input className="form-control mb-3" placeholder="Lesson title"
                    value={title} onChange={e => setTitle(e.target.value)} required />

                <textarea className="form-control mb-3" placeholder="Lesson content"
                    value={content} onChange={e => setContent(e.target.value)} required />

                <button className="btn btn-primary">Create Lesson</button>
            </form>
        </div>
    );
}

export default Lesson;
