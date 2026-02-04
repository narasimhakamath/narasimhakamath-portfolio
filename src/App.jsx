import './App.css';
import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Services from './components/Services';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

// Lazy load Photography component
const Photography = lazy(() => import('./components/Photography'));

function MainContent() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Skills />
      <Services />
      <Experience />
      <Blog />
      <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center', color: '#a0a0a0' }}>Loading Photography...</div>}>
        <Photography />
      </Suspense>
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
