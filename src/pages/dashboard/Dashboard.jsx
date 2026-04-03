import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 9;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(limit, skip);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const handlePageChange = (direction) => {
    if (direction === "next" && skip + limit < total) {
      setSkip(skip + limit);
    } else if (direction === "prev" && skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  if (loading && products.length === 0) {
    return <div className="loading-state">Loading inventory...</div>;
  }

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div className="header-meta">
          <h1>Product Catalog</h1>
          <p>Explore {total} products across categories</p>
        </div>
        <div className="pagination-controls">
          <button 
            disabled={skip === 0} 
            onClick={() => handlePageChange("prev")}
            className="pagi-btn"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="pagi-info">
            Page {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
          </span>
          <button 
            disabled={skip + limit >= total} 
            onClick={() => handlePageChange("next")}
            className="pagi-btn"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </header>

      <div className="product-grid">
        <AnimatePresence mode="wait">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-img-container">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-badge">{product.category}</div>
              </div>
              <div className="product-details">
                <div className="product-meta">
                  <div className="rating">
                    <i className="fa-solid fa-star"></i>
                    <span>{product.rating}</span>
                  </div>
                  <span className="brand">{product.brand}</span>
                </div>
                <h3>{product.title}</h3>
                <p className="description">{product.description.substring(0, 60)}...</p>
                <div className="product-footer">
                  <div className="price-tag">
                    <span className="currency">$</span>
                    <span className="amount">{product.price}</span>
                  </div>
                  <button className="view-more-btn">
                     <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .dashboard-content {
          width: 100%;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-meta h1 { font-size: 24px; font-weight: 700; color: #1e293b; }
        .header-meta p { color: var(--text-muted); font-size: 14px; }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }

        .pagi-btn {
          background: #ffffff;
          border: 1px solid var(--border);
          color: #64748b;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .pagi-btn:hover:not(:disabled) { background: #f8fafc; border-color: var(--primary); color: var(--primary); }
        .pagi-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .pagi-info { font-size: 13px; font-weight: 600; color: #475569; min-width: 100px; text-align: center; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .product-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: var(--shadow-md);
        }

        .product-img-container {
          position: relative;
          height: 180px;
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-img-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .product-card:hover img { transform: scale(1.05); }

        .product-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .product-details {
          padding: 16px;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          color: #fbbf24;
        }

        .brand {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .product-details h3 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .description {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.5;
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .price-tag {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .currency { font-size: 13px; font-weight: 600; color: var(--text-muted); }
        .amount { font-size: 18px; font-weight: 800; color: #0f172a; }

        .view-more-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #f8fafc;
          border: 1px solid var(--border);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .product-card:hover .view-more-btn {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        @media (max-width: 600px) {
          .dashboard-header { flex-direction: column; gap: 16px; align-items: flex-start; }
          .pagination-controls { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
