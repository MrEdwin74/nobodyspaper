import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const apiHost = window.location.hostname;
        fetch(`http://${apiHost}:8000/api/articles/${slug}/`)
            .then(res => res.json())
            .then(data => {
                setArticle(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching article:', err);
                setLoading(false);
            });
    }, [slug]);

    const handleCopyLink = () => {
        // Kopier lenke til utklippstavle
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

            // Kall backend for å øke teller
            const apiHost = window.location.hostname;
            fetch(`http://${apiHost}:8000/api/articles/${slug}/copy/`, {
                method: 'POST',
            }).catch(console.error);
        });
    };

    if (loading) return <div className="container">Laster...</div>;
    if (!article) return <div className="container">Artikkel ikke funnet</div>;

    return (
        <div className="container article-reader">
            {/* Navbar / Top Bar */}
            <nav className="top-nav">
                <Link to="/" className="logo">NOBODYSPAPER</Link>
                <div className="nav-links">
                    <Link to="/">Archive</Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="admin-link">
                    <a href={`http://${window.location.hostname}:8000/admin/`} target="_blank" rel="noopener noreferrer">Sign in</a>
                </div>
            </nav>

            <article style={{ marginTop: '4rem' }}>
                <header className="article-header">
                    <span className="category">{article.category}</span>
                    <h1 className="title">{article.title}</h1>
                    <div className="meta">
                        <span>{format(new Date(article.created_at), 'dd.MM.yyyy')}</span>
                    </div>
                </header>

                <div className="content" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                <footer className="article-footer">
                    <button onClick={handleCopyLink} className={copied ? 'copied' : ''}>
                        {copied ? 'Lenke kopiert!' : 'Kopier lenke'}
                    </button>
                    {/* Valgfritt: Vis teller for admin/debugging */}
                    {/* <span>{article.copy_count} kopieringer</span> */}
                </footer>

                <div style={{ textAlign: 'center', opacity: 0.3, fontSize: '0.8rem', marginBottom: 'var(--space-md)' }}>
                    <a href={`http://${window.location.hostname}:8000/admin/`} target="_blank" rel="noopener noreferrer">Admin</a>
                </div>
            </article>

            <style>{`
                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .article-reader article {
                    max-width: 800px; /* Smalere kolonne for selve artikkelinnholdet */
                    margin: 0 auto;
                }

                /* Nav Styles (copied from ArticleList) */
                .top-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem 0;
                    border-bottom: 1px solid var(--color-border);
                }
                .logo {
                    font-weight: 900;
                    font-size: 1.2rem;
                    letter-spacing: 0.1em;
                    text-decoration: none;
                    color: var(--color-text-main);
                }
                .nav-links a, .nav-links span {
                    margin: 0 1rem;
                    color: var(--color-text-muted);
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 0.05em;
                }
                .nav-links a:hover {
                    color: var(--color-text-main);
                }
                .admin-link a {
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                    border: 1px solid var(--color-border);
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .admin-link a:hover {
                    border-color: var(--color-text-main);
                    color: var(--color-text-main);
                }

                .article-header {
                    margin-bottom: var(--space-lg);
                    text-align: center;
                }

                .category {
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-text-muted);
                    font-size: 0.9rem;
                    display: block;
                    margin-bottom: var(--space-sm);
                }

                .title {
                    font-size: 2.5rem;
                    font-family: var(--font-serif);
                    margin-bottom: var(--space-sm);
                    line-height: 1.2;
                }

                .meta {
                    color: var(--color-text-muted);
                    font-size: 0.9rem;
                }

                .content {
                    font-family: var(--font-serif);
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--color-text-main);
                }

                .content p {
                    margin-bottom: var(--space-md);
                }

                .content img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: var(--space-md) auto;
                    border-radius: 4px;
                }

                .article-footer {
                    margin-top: var(--space-xl);
                    margin-bottom: var(--space-xl);
                    display: flex;
                    justify-content: center;
                    border-top: 1px solid var(--color-border);
                    padding-top: var(--space-md);
                }

                button.copied {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                }
            `}</style>
        </div>
    );
};

export default ArticleDetail;
