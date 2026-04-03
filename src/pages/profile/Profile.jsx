import React from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div className="loading-state">Identifying user session...</div>;

  return (
    <div className="profile-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-card"
      >
        <div className="profile-hero">
          <div className="avatar-container">
            <img src={user.image} alt={user.firstName} />
            <div className="status-indicator" />
          </div>
          <div className="hero-text">
            <h1>{user.firstName} {user.lastName}</h1>
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-main">
            <section className="profile-section">
              <h3>Primary Account Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <i className="fa-solid fa-id-card info-icon"></i>
                  <div className="info-content">
                    <span className="info-label">Member ID</span>
                    <span className="info-value">#{user.id}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-envelope info-icon"></i>
                  <div className="info-content">
                    <span className="info-label">Email Address</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-user info-icon"></i>
                  <div className="info-content">
                    <span className="info-label">First Name</span>
                    <span className="info-value">{user.firstName}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-user info-icon"></i>
                  <div className="info-content">
                    <span className="info-label">Last Name</span>
                    <span className="info-value">{user.lastName}</span>
                  </div>
                </div>
                <div className="info-item">
                   <i className="fa-solid fa-venus-mars info-icon"></i>
                   <div className="info-content">
                     <span className="info-label">Gender</span>
                     <span className="info-value" style={{ textTransform: 'capitalize' }}>{user.gender}</span>
                   </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="profile-sidebar">
            <div className="sidebar-card">
              <h3>Account Security</h3>
              <div className="security-status">
                <div className="status-ring">
                   <i className="fa-solid fa-shield-check" style={{ color: 'var(--success)', fontSize: '20px' }}></i>
                </div>
                <div className="status-text">
                   <h4>Active Session</h4>
                   <p>Verified via Auth Token</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>

      <style>{`
        .profile-container { max-width: 1000px; margin: 0 auto; }
        
        .profile-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .profile-hero {
          background: #1e293b;
          padding: 32px 40px; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 32px;
        }

        .avatar-container {
          position: relative; width: 80px; height: 80px;
          border-radius: 12px; border: 2px solid #ffffff;
          background: #f8fafc; overflow: hidden;
        }
        .avatar-container img { width: 100%; height: 100%; object-fit: cover; }
        .status-indicator {
          position: absolute; bottom: 4px; right: 4px;
          width: 12px; height: 12px; background: var(--success);
          border-radius: 50%; border: 2px solid #1e293b;
        }

        .hero-text h1 { font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
        .hero-text p { color: #94a3b8; font-size: 14px; }

        .profile-grid { display: grid; grid-template-columns: 1fr 280px; gap: 32px; padding: 32px; }

        .profile-section h3 { font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }

        .info-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .info-item { display: flex; align-items: center; gap: 12px; }
        .info-icon { color: #64748b; background: #f8fafc; padding: 8px; border-radius: 6px; border: 1px solid #f1f5f9; }
        .info-content { display: flex; flex-direction: column; }
        .info-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { font-size: 14px; font-weight: 600; color: #334155; }

        .sidebar-card { background: #f8fafc; border: 1px solid #edf2f7; padding: 20px; border-radius: var(--radius-md); }
        .sidebar-card h3 { font-size: 12px; font-weight: 700; margin-bottom: 12px; color: #475569; }

        .security-status { display: flex; gap: 12px; }
        .status-ring { background: #dcfce7; padding: 8px; border-radius: 50%; display: flex; align-items: center; }
        .status-text h4 { font-size: 13px; color: var(--success); font-weight: 700; }
        .status-text p { font-size: 11px; color: #64748b; }

        @media (max-width: 850px) {
          .profile-grid { grid-template-columns: 1fr; }
          .info-list { grid-template-columns: 1fr; }
          .profile-hero { flex-direction: column; text-align: center; gap: 16px; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
