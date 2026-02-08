import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const apiHost = window.location.hostname;
        fetch(`http://${apiHost}:8000/api/articles/`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching articles:', err);
                setLoading(false);
            });
    }, []);

    const filteredArticles = filter === 'all'
        ? articles
        : articles.filter(a => a.category === filter);

    const categories = ['all', 'notat', 'tanke', 'essay', 'fragment'];

    if (loading) return <div className="container" style={{ paddingTop: '4rem' }}>loading_assets...</div>;

    return (
        <div className="app-container">
            {/* Navbar / Top Bar */}
            <nav className="top-nav">
                <Link to="/" className="logo">NOBODYSPAPER</Link>
                <div className="nav-links">
                    <Link to="/" className="active">Archive</Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="admin-link">
                    <a href={`http://${window.location.hostname}:8000/admin/`} target="_blank" rel="noopener noreferrer">Sign in</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <h1>
                    COLLECTED THOUGHTS<br />
                    FROM THE NOBODY
                </h1>

                <p className="hero-sub">
                    A curated archive of notes, essays, and fragments.
                </p>
            </header>

            {/* Filter Bar */}
            <div className="filter-bar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={filter === cat ? 'active' : ''}
                        onClick={() => setFilter(cat)}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="premium-grid">
                {filteredArticles.map(article => (
                    <Link to={`/${article.slug}`} key={article.id} className="premium-card">
                        <div className="card-image">
                            {article.first_image ? (
                                <img src={article.first_image} alt={article.title} />
                            ) : (
                                <div className="placeholder-image">
                                    <span>{article.category}</span>
                                </div>
                            )}
                        </div>
                        <div className="card-content">
                            <div className="card-top">
                                <span className="card-cat">{article.category}</span>
                                <span className="card-date">{format(new Date(article.created_at), 'MMM dd')}</span>
                            </div>
                            <h3>{article.title}</h3>
                            <p>{article.excerpt || "Click to read more..."}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
                :root {
                    --bg-dark: #0a0a0a;
                    --bg-card: #111;
                    --border-color: #222;
                    --accent-color: #ff4757; /* A subtle red/orange for "Dark" vibe */
                    --text-main: #fff;
                    --text-muted: #888;
                }

                .app-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Nav */
                .top-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem 0;
                    border-bottom: 1px solid var(--border-color);
                }
                .logo {
                    font-weight: 900;
                    font-size: 1.2rem;
                    letter-spacing: 0.1em;
                    text-decoration: none;
                    color: var(--text-main);
                }
                .nav-links a, .nav-links span {
                    margin: 0 1rem;
                    color: var(--text-muted);
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 0.05em;
                }
                .nav-links a.active {
                    color: var(--text-main);
                }
                .admin-link a {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    border: 1px solid var(--border-color);
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .admin-link a:hover {
                    border-color: var(--text-main);
                    color: var(--text-main);
                }

                /* Hero Section */
                .hero {
                    padding: 6rem 0 2rem 0; /* Keeping the short frame */
                    text-align: center;
                    border-bottom: 1px solid var(--border-color);
                    background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('/hero-bg.png');
                    background-size: contain; /* Fit the whole image vertically */
                    background-repeat: no-repeat;
                    background-position: center; /* Center it */
                    background-color: #080808;
                }
                .hero h1 {
                    font-size: 4rem;
                    line-height: 1.1;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    color: #fff;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
                }
                .hero-sub {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    letter-spacing: 0.05em;
                    margin-bottom: 0; /* Remove margin so frame ends here */
                }

                /* Filter */
                .filter-bar {
                    padding: 2rem 0;
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                }
                .filter-bar button {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1rem;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    transition: all 0.2s;
                }
                .filter-bar button:hover, .filter-bar button.active {
                    color: var(--text-main);
                    background: #222;
                }

                /* Grid */
                .premium-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 2rem;
                    padding-bottom: 4rem;
                }
                
                .premium-card {
                    background: var(--bg-card); /* Slightly lighter than pure black */
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    overflow: hidden;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .premium-card:hover {
                    border-color: var(--text-muted);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .card-image {
                    height: 200px;
                    background: #000;
                    overflow: hidden;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                
                .premium-card:hover .card-image img {
                    transform: scale(1.05);
                }

                .placeholder-image {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(45deg, #111, #222);
                    color: #333;
                    font-weight: 900;
                    text-transform: uppercase;
                    font-size: 2rem;
                }

                .card-content {
                    padding: 1.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .premium-card h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: var(--text-main);
                    line-height: 1.2;
                }

                .premium-card p {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin: 0;
                }

            `}</style>
        </div>
    );
};

export default ArticleList;
