import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';
import Prospectus from './pages/Prospectus';
import Privacy from './pages/Privacy';
import Grades from './pages/Grades';
import Registration from './pages/Registration';
import ClassSchedule from './pages/ClassSchedule';
import Fees from './pages/Fees';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-session');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem('kaplag-session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('kaplag-session');
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes - all require authentication */}
        <Route element={<ProtectedRoute user={user}><Layout onLogout={handleLogout} /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="registration" element={<Registration />} />
          <Route path="class-schedule" element={<ClassSchedule />} />
          <Route path="school-calendar" element={<Navigate to="/class-schedule" replace />} />
          <Route path="grades" element={<Grades />} />
          <Route path="fees" element={<Fees />} />
          <Route path="prospectus" element={<Prospectus />} />
          <Route path="announcements" element={<ComingSoon title="Announcements" />} />
          <Route path="up-mail" element={<ComingSoon title="UP Mail" />} />
          <Route path="student-information" element={<ComingSoon title="Student Information" />} />
          <Route path="evaluations" element={<ComingSoon title="Evaluations" />} />
          <Route path="campus-facility" element={<ComingSoon title="Campus Facility & Safety" />} />
          <Route path="college-facility" element={<ComingSoon title="College Facility & Safety" />} />
          <Route path="student-housing" element={<ComingSoon title="Student Housing" />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;