import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { initAuth } from './lib/auth';

// Page imports (to be created)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Materi from './pages/Materi';
import Video from './pages/Video';
import Quiz from './pages/Quiz';
import Review from './pages/Review';
import Result from './pages/Result';
import Dosen from './pages/Dosen';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    initAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        
        <Route path="/materi" element={
          <Layout>
            <Materi />
          </Layout>
        } />
        
        <Route path="/video" element={
          <Layout>
            <Video />
          </Layout>
        } />
        
        <Route path="/quiz" element={
          <Layout>
            <Quiz />
          </Layout>
        } />

        <Route path="/review" element={
          <Layout>
            <Review />
          </Layout>
        } />

        <Route path="/result" element={
          <Layout>
            <Result />
          </Layout>
        } />

        <Route path="/dosen" element={
          <Layout>
            <Dosen />
          </Layout>
        } />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
