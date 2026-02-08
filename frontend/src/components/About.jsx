import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="app-container">
            {/* Navbar / Top Bar */}
            <nav className="top-nav">
                <div className="logo">NOBODYSPAPER</div>
                <div className="nav-links">
                    <Link to="/">Archive</Link>
                    <span className="active">About</span>
                </div>
                <div className="admin-link">
                    <a href={`http://${window.location.hostname}:8000/admin/`} target="_blank" rel="noopener noreferrer">Sign in</a>
                </div>
            </nav>

            <main className="about-content">
                <h1>About</h1>

                <p style={{ fontSize: '1.4rem', fontStyle: 'italic', marginBottom: '3rem' }}>
                    Nobody’s Paper er et stille rom for tanker som ikke roper.
                </p>

                <p>
                    Dette er ikke en nyhetsside.<br />
                    Ikke et manifest.<br />
                    Ikke et forsøk på å overbevise.
                </p>
                <p>
                    Det er et arkiv av notater, korte tekster og fragmenter – skrevet for å forstå, ikke for å vinne. Noen ganger er det refleksjoner, andre ganger spørsmål. Ofte er det bare forsøk på å sette ord på noe som ellers ville blitt liggende uformulert.
                </p>
                <p>
                    Navnet kommer av et enkelt ønske:<br />
                    Å skrive uten å måtte være noen.<br />
                    Uten posisjon, uten rolle, uten forventning.
                </p>
                <p>
                    Tekstene her er ikke ment å være ferdige svar. De er spor av tanker i bevegelse. Hvis noe treffer, er det fint. Hvis ikke, er det også greit.
                </p>

                <hr style={{ margin: '3rem 0', borderColor: 'var(--border-color)', opacity: 0.3 }} />

                <p>
                    Dette er et sted for langsom lesing.<br />
                    For det uperfekte.<br />
                    For det som ikke alltid passer inn.
                </p>

                <p style={{ marginTop: '3rem', opacity: 0.6 }}>
                    —<br />
                    Nobody
                </p>
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

                .about-content p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #ddd;
                    margin-bottom: 1.5rem;
                }

            `}</style>
        </div>
    );
};

export default About;
