import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/about" element={<About />} />
        <Route path="/:slug" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
