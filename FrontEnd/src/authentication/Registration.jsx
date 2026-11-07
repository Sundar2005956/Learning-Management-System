
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setMessage("Connecting to server. Please wait...");

        try {
            const result = await axios.post(
                "https://api-learning-management-system.onrender.com/register",
                user,
                { timeout: 120000 }
            );

            alert("Registration successful!");

            setUser({
                fullName: "",
                email: "",
                password: "",
                role: ""
            });

            console.log(result.data);

            navigate("/login");

        } catch (error) {
            console.error(
                error.response?.data || error.message
            );

            if (error.code === "ECONNABORTED") {
                alert("Server is taking too long. Please try again.");
            } else if (error.response) {
                alert(
                    error.response.data?.message ||
                    "Registration failed. Please check your details."
                );
            } else {
                alert("Unable to connect to server. Please try again.");
            }

        } finally {
            setLoading(false);
            setMessage("");
        }
    };

    return (
        <div className="registration-page">
            <div className="register-container">

                <div className="register-info">
                    <div className="brand">
                        <span className="brand-icon">L</span>
                        <span>LearnHub</span>
                    </div>

                    <div className="info-content">
                        <span className="welcome-tag">
                            YOUR LEARNING JOURNEY
                        </span>

                        <h1>Learn something new every day.</h1>

                        <p>
                            Join LearnHub to explore courses, develop your skills,
                            and take the next step in your learning journey.
                        </p>

                        <div className="feature">
                            <span>✓</span>
                            Quality learning resources
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            Track your learning progress
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            Learn at your own pace
                        </div>
                    </div>

                    <p className="info-footer">
                        Start learning. Keep growing.
                    </p>
                </div>

                <div className="register-form-section">
                    <div className="form-heading">
                        <span className="small-label">
                            GET STARTED FOR FREE
                        </span>

                        <h2>Create your account</h2>

                        <p>
                            Enter your details to join the LearnHub community.
                        </p>
                    </div>

                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <label className="form-label">Full name</label>

                            <input
                                type="text"
                                className="form-control custom-input"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={user.fullName}
                                onChange={onchange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>

                            <input
                                type="email"
                                className="form-control custom-input"
                                name="email"
                                placeholder="you@example.com"
                                value={user.email}
                                onChange={onchange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>

                            <input
                                type="password"
                                className="form-control custom-input"
                                name="password"
                                placeholder="Create a password"
                                value={user.password}
                                onChange={onchange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Register as</label>

                            <select
                                className="form-select custom-input"
                                name="role"
                                value={user.role}
                                onChange={onchange}
                                required
                                disabled={loading}
                            >
                                <option value="">Choose your role</option>
                                <option value="STUDENT">Student</option>
                                <option value="INSTRUCTOR">Instructor</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn register-btn w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Creating account...
                                </>
                            ) : (
                                "Create account →"
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

                        <p className="terms-text">
                            By registering, you agree to use LearnHub responsibly.
                        </p>

                        <Link to="/login" className="terms-text">
                            Already Registered? Sign in
                        </Link>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Registration;
