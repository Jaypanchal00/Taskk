import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/api";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-state">Fetching product details...</div>;
  if (!product) return <div className="error-state">Product not found</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <i className="fa-solid fa-arrow-left"></i>
        <span>Back to Directory</span>
      </button>

      <div className="detail-layout">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-gallery"
        >
          <img src={product.thumbnail} alt={product.title} />
          <div className="image-grid">
            {product.images.slice(0, 3).map((img, i) => (
              <img key={i} src={img} alt={`${product.title}-${i}`} />
            ))}
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           className="product-info"
        >
          <div className="info-header">
            <span className="info-badge">{product.category}</span>
            <div className="info-rating">
              <i className="fa-solid fa-star" style={{ color: '#fbbf24' }}></i>
              <span>{product.rating} (120 reviews)</span>
            </div>
          </div>

          <h1 className="info-title">{product.title}</h1>
          <p className="info-brand">Brand: <span>{product.brand}</span></p>

          <div className="info-price">
            <div className="main-price">
              <span className="price-symbol">$</span>
              <span className="price-val">{product.price}</span>
            </div>
            {product.discountPercentage > 0 && <div className="discount-tag">{product.discountPercentage}% OFF</div>}
          </div>

          <p className="info-desc">{product.description}</p>

          <div className="info-tags">
            {product.tags?.map(tag => (
              <span key={tag} className="tag-chip">#{tag}</span>
            ))}
          </div>

          <div className="info-specs">
            <div className="spec-item">
              <span className="spec-label">Availability</span>
              <span className={`spec-value ${product.stock < 10 ? 'low-stock' : 'in-stock'}`}>
                {product.availabilityStatus || (product.stock > 0 ? "In Stock" : "Out of Stock")} ({product.stock} units)
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">{product.weight}kg</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">{product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">SKU</span>
              <span className="spec-value">{product.sku}</span>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-item">
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--success)', fontSize: '20px', marginBottom: '8px' }}></i>
              <span>{product.warrantyInformation || '1 Year Warranty'}</span>
            </div>
            <div className="trust-item">
              <i className="fa-solid fa-truck-fast" style={{ color: 'var(--accent)', fontSize: '20px', marginBottom: '8px' }}></i>
              <span>{product.shippingInformation || 'Fast Shipping'}</span>
            </div>
            <div className="trust-item">
              <i className="fa-solid fa-rotate-left" style={{ color: 'var(--primary)', fontSize: '20px', marginBottom: '8px' }}></i>
              <span>{product.returnPolicy || '30 Day Returns'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .detail-container { max-width: 1100px; margin: 0 auto; }
        
        .back-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; color: var(--text-muted);
          cursor: pointer; font-size: 14px; font-weight: 500;
          margin-bottom: 32px; padding: 8px 12px; border-radius: 8px;
          transition: var(--transition-fast);
        }
        .back-btn:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }

        .detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }

        .product-gallery { display: flex; flex-direction: column; gap: 16px; }
        .product-gallery > img {
          width: 100%; aspect-ratio: 1/1; object-fit: cover;
          border-radius: var(--radius-lg); border: 1px solid var(--glass-border);
        }
        .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .image-grid img {
          width: 100%; aspect-ratio: 1/1; object-fit: cover;
          border-radius: var(--radius-md); border: 1px solid var(--glass-border);
          cursor: pointer; opacity: 0.7; transition: var(--transition-fast);
        }
        .image-grid img:hover { opacity: 1; transform: scale(1.05); }

        .product-info { display: flex; flex-direction: column; }
        
        .info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .info-badge { background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 4px 12px; border-radius: var(--radius-full); font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .info-rating { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: var(--text-muted); }

        .info-title { font-size: 36px; font-weight: 800; line-height: 1.2; margin-bottom: 8px; }
        .info-brand { font-size: 16px; color: var(--text-muted); margin-bottom: 20px; }
        .info-brand span { font-weight: 600; color: var(--text); }

        .info-price { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .main-price { display: flex; align-items: baseline; gap: 4px; }
        .price-symbol { font-size: 20px; font-weight: 500; color: var(--accent); }
        .price-val { font-size: 40px; font-weight: 800; }
        .discount-tag { background: var(--success); color: var(--background); padding: 4px 10px; border-radius: 8px; font-size: 13px; font-weight: 800; }

        .info-desc { font-size: 16px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }

        .info-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
        .tag-chip { font-size: 12px; color: var(--accent); background: rgba(56, 189, 248, 0.1); padding: 4px 10px; border-radius: var(--radius-full); }

        .info-specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
          padding: 24px; background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md); border: 1px solid var(--glass-border);
          margin-bottom: 40px;
        }
        .spec-item { display: flex; flex-direction: column; gap: 4px; }
        .spec-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .spec-value { font-size: 15px; font-weight: 600; }
        .low-stock { color: var(--error); }
        .in-stock { color: var(--success); }

        .info-actions { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; margin-bottom: 40px; }
        .primary-action {
          background: var(--primary); color: white; border: none;
          padding: 16px; border-radius: var(--radius-md);
          font-size: 16px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: var(--transition-fast);
        }
        .primary-action:hover { background: var(--primary-hover); transform: translateY(-2px); }
        .secondary-action {
          background: rgba(255, 255, 255, 0.05); color: white; border: 1px solid var(--glass-border);
          padding: 16px; border-radius: var(--radius-md);
          font-size: 16px; font-weight: 700; cursor: pointer;
          transition: var(--transition-fast);
        }
        .secondary-action:hover { background: rgba(255, 255, 255, 0.08); }

        .trust-badges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .trust-item {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 12px; background: rgba(255, 255, 255, 0.02);
          border-radius: 12px; border: 1px solid var(--glass-border);
          font-size: 12px; font-weight: 500; text-align: center; color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .detail-layout { grid-template-columns: 1fr; gap: 40px; }
          .info-title { font-size: 28px; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
