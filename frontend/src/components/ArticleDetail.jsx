import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/articles/${slug}/`)
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
            fetch(`http://127.0.0.1:8000/api/articles/${slug}/copy/`, {
                method: 'POST',
            }).catch(console.error);
        });
    };

    if (loading) return <div className="container">Laster...</div>;
    if (!article) return <div className="container">Artikkel ikke funnet</div>;

    return (
        <div className="container article-reader">
            <header style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
                <nav>
                    <Link to="/">← Tilbake til arkivet</Link>
                </nav>
            </header>

            <article>
                <header className="article-header">
                    <span className="category">{article.category}</span>
                    <h1 className="title">{article.title}</h1>
                    <div className="meta">
                        <span>{format(new Date(article.created_at), 'dd.MM.yyyy')}</span>
                    </div>
                </header>

                <div className="content">
                    {article.content.split('\n').map((paragraph, idx) => (
                        paragraph ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                    ))}
                </div>

                <footer className="article-footer">
                    <button onClick={handleCopyLink} className={copied ? 'copied' : ''}>
                        {copied ? 'Lenke kopiert!' : 'Kopier lenke'}
                    </button>
                    {/* Valgfritt: Vis teller for admin/debugging */}
                    {/* <span>{article.copy_count} kopieringer</span> */}
                </footer>
            </article>

            <style>{`
                .article-reader {
                    max-width: 800px; /* Smalere kolonne for lesing */
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
