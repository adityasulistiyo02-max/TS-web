import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Article from './pages/Article';
import Archive from './pages/Archive';
import Studio from './pages/Studio';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="archive" element={<Archive />} />
          <Route path="studio" element={<Studio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;