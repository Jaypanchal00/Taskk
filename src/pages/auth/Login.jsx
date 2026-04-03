import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    const success = await login(username, password);
    if (!success) {
      setLocalError("Invalid credentials. Try 'emilys' / 'emilyspass'");
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="logo-sparkle">
            <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '24px', color: 'var(--primary)' }}></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-envelope input-icon"></i>
              <input
                type="text"
                placeholder="emilys"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock input-icon"></i>
              <input
                type="password"
                placeholder="emilyspass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {localError && (
            <div className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{localError}</span>
            </div>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>
        </form>
      </motion.div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 40px;
          box-shadow: var(--shadow-md);
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-sparkle {
          width: 56px;
          height: 56px;
          background: #eff6ff;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 1px solid #dbeafe;
        }

        .login-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .login-header p {
          color: var(--text-muted);
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-left: 2px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
        }

        .input-wrapper input {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 12px 12px 42px;
          color: var(--text);
          font-size: 15px;
          transition: var(--transition-fast);
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          padding: 12px;
          border-radius: var(--radius-sm);
          color: var(--error);
          font-size: 13px;
          font-weight: 500;
        }

        .login-button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: var(--transition-fast);
        }

        .login-button:hover {
          background: var(--primary-hover);
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: var(--text-muted);
        }

        .login-footer span {
          color: var(--primary);
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;
