import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-logo">
            <i className="fa-solid fa-box" style={{ color: 'var(--primary)', fontSize: '20px' }}></i>
          </div>
          <span>Inventory Manager</span>
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fa-solid fa-layer-group"></i>
            <span>Products</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </NavLink>
        </div>

        <div className="nav-user">
          <div className="user-info">
            <span className="user-name">{user?.firstName} {user?.lastName}</span>
            <span className="user-role">{user?.username}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </nav>

      <main className="main-content">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <style>{`
        .layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }

        .navbar {
          height: 64px;
          border-bottom: 1px solid var(--border);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 18px;
          color: #0f172a;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          background: #eff6ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dbeafe;
        }

        .nav-links {
          display: flex;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition-fast);
          padding: 8px 16px;
          border-radius: var(--radius-sm);
        }

        .nav-item:hover {
          color: var(--primary);
          background: #f1f5f9;
        }

        .nav-item.active {
          color: var(--primary);
          background: #eff6ff;
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 16px;
          border-left: 1px solid var(--border);
          padding-left: 20px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .user-role {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 8px;
          border-radius: 6px;
        }

        .logout-btn:hover {
          color: var(--error);
          background: #fef2f2;
        }

        .main-content {
          flex: 1;
          padding: 32px 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 16px; }
          .nav-links { display: none; }
          .user-name { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
