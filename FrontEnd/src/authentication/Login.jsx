
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            const result = await axios.post(
                "https://api-learning-management-system.onrender.com/login",
                { email, password }
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
            console.error(error);
            alert("Login failed. Check your email and password.");
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
                    />
                </div>

                <button className="btn register-btn w-100" type="submit">
                    Login
                </button>
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
