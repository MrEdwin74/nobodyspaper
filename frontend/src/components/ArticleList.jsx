import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/articles/')
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

    if (loading) return <div className="container">Laster...</div>;

    return (
        <div className="container content-grid">
            <header style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
                <h1>nobodyspaper</h1>
                <nav style={{ marginTop: 'var(--space-sm)' }}>
                    <Link to="/" style={{ marginRight: 'var(--space-sm)' }}>Arkiv</Link>
                    <span style={{ color: 'var(--color-text-muted)' }}>Om</span>
                </nav>
            </header>
            
            <div className="masonry-grid">
                {articles.map(article => (
                    <article key={article.id} className="card">
                        <div className="card-meta">
                            <span className="category">{article.category}</span>
                            <span className="date">{format(new Date(article.created_at), 'dd.MM.yyyy')}</span>
                        </div>
                        <Link to={`/${article.slug}`}>
                            <h2>{article.title}</h2>
                        </Link>
                        <p className="excerpt">{article.excerpt || article.content.substring(0, 150) + '...'}</p>
                    </article>
                ))}
            </div>

            <style>{`
                .masonry-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: var(--space-md);
                    padding-bottom: var(--space-xl);
                }
                
                .card {
                    background: var(--color-bg-card);
                    padding: var(--space-md);
                    border: 1px solid var(--color-border);
                    transition: transform var(--transition-fast);
                }
                
                .card:hover {
                    transform: translateY(-2px);
                    border-color: var(--color-text-muted);
                }

                .card-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                    margin-bottom: var(--space-xs);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .card h2 {
                    font-size: 1.2rem;
                    margin-bottom: var(--space-sm);
                    font-weight: 500;
                    color: var(--color-text-main);
                }

                .excerpt {
                    font-size: 0.95rem;
                    color: var(--color-text-muted);
                    line-height: 1.5;
                }
            `}</style>
        </div>
    );
};

export default ArticleList;
