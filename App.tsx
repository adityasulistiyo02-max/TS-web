import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Article from './pages/Article';
import Archive from './pages/Archive';
import Studio from './pages/Studio';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="archive" element={<Archive />} />
          <Route path="studio" element={<Studio />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;