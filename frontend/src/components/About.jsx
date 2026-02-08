import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiHost = window.location.hostname;
        fetch(`http://${apiHost}:8000/api/infopages/about/`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setPage(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching about page:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="app-container" style={{ paddingTop: '4rem' }}>loading_assets...</div>;
    if (!page) return <div className="app-container" style={{ paddingTop: '4rem' }}>Page not found</div>;

    return (
        <div className="app-container">
            {/* Navbar / Top Bar */}
            <nav className="top-nav">
                <Link to="/" className="logo">NOBODYSPAPER</Link>
                <div className="nav-links">
                    <Link to="/">Archive</Link>
                    <span className="active">About</span>
                </div>
                <div className="admin-link">
                    <a href={`http://${window.location.hostname}:8000/admin/`} target="_blank" rel="noopener noreferrer">Sign in</a>
                </div>
            </nav>

            <main className="about-content">
                <h1>{page.title}</h1>

                <div className="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </main>

            <style>{`
                :root {
                    --bg-dark: #0a0a0a;
                    --bg-card: #111;
                    --border-color: #222;
                    --accent-color: #ff4757;
                    --text-main: #fff;
                    --text-muted: #888;
                }

                .app-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    /* Full page background settings */
                    min-height: 100vh;
                    background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url('/hero-bg.png');
                    background-size: contain; /* Show the whole image */
                    background-repeat: no-repeat;
                    background-position: center;
                    background-attachment: fixed;
                    background-color: #000; /* Fill empty space with black */
                }

                /* Nav - Copy of ArticleList styles for consistency */
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
                .nav-links span.active, .nav-links a.active {
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

                .about-content {
                    max-width: 800px;
                    margin: 4rem auto;
                    font-family: serif; /* Using serif for text heavy content like the ArticleDetail */
                }

                .about-content h1 {
                    font-family: sans-serif;
                    font-size: 3rem;
                    margin-bottom: 2rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }

                .about-content h2 {
                    font-family: sans-serif;
                    font-size: 1.8rem;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }

                .content {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #ddd;
                }
                
                .content p {
                    margin-bottom: 1.5rem;
                }
                
                .content hr {
                    margin: 3rem 0;
                    border-color: var(--border-color);
                    opacity: 0.3;
                }

            `}</style>
        </div>
    );
};

export default About;
