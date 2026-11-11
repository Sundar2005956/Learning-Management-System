
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Submission() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = state?.user;

    const [assignments, setAssignments] = useState([]);
    const [assignmentId, setAssignmentId] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        axios.get("https://learning-management-system-production-ca71752e.up.railway.app/assignment")
            .then(res => setAssignments(res.data))
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
                `https://learning-management-system-production-ca71752e.up.railway.app/submission/${user.id}/${assignmentId}`,
                { answer }
            );
            alert("Submission completed!");
            setAssignmentId("");
            setAnswer("");
        } catch (error) {
            console.error(error);
            alert("Submission failed.");
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2>Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Select Assignment</label>
                <select className="form-select mb-3" value={assignmentId}
                    onChange={e => setAssignmentId(e.target.value)} required>
                    <option value="">Choose an assignment</option>
                    {assignments.map(a => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>

                <label className="form-label">Your Answer</label>
                <textarea className="form-control mb-3" value={answer}
                    onChange={e => setAnswer(e.target.value)} required />

                <button className="btn btn-primary">Submit Assignment</button>
            </form>
        </div>
    );
}

export default Submission;
