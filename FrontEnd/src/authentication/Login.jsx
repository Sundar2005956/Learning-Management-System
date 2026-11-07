
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setMessage("Connecting to server. Please wait...");

        try {
            const result = await axios.post(
                "https://api-learning-management-system.onrender.com/login",
                { email, password },
                { timeout: 120000 }
            );

            const user = result.data;

            if (user.role === "STUDENT") {
                navigate("/student-dashboard", {
                    state: { user }
                });
            } else if (user.role === "INSTRUCTOR") {
                navigate("/instructor-dashboard", {
                    state: { user }
                });
            } else if (user.role === "ADMIN") {
                navigate("/admin-dashboard", {
                    state: { user }
                });
            } else {
                alert("Invalid user role");
            }

        } catch (error) {
            console.error("Login error:", error);

            if (error.code === "ECONNABORTED") {
                alert("Server is taking too long. Please try again.");
            } else if (error.response) {
                alert(
                    error.response.data?.message ||
                    "Login failed. Check your email and password."
                );
            } else {
                alert("Unable to connect to server. Please try again.");
            }

        } finally {
            setLoading(false);
            setMessage("");
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <h2 className="mb-4">Login to LearnHub</h2>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control custom-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control custom-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    className="btn register-btn w-100"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Connecting...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                {loading && (
                    <p className="text-center text-primary mt-3">
                        {message}
                        <br />
                        <small className="text-muted">
                            The server may take a little time to wake up.
                        </small>
                    </p>
                )}
            </form>

            <p className="terms-text mt-3">
                Welcome back to LearnHub!
            </p>

            <Link to="/" className="terms-text">
                Click here to Register!
            </Link>
        </div>
    );
}

export default Login;
