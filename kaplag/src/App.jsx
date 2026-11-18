import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Placeholder pages for navigation (to be implemented)
const ComingSoon = ({ title }) => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: 'var(--bg)' }}>
    <div className="text-center">
      <h1 className="text-maroon mb-3">{title}</h1>
      <p className="text-muted-custom mb-4">Coming soon — page under development</p>
      <a href="/login" className="btn btn-primary">Back to Login</a>
    </div>
  </div>
);

// Page components (placeholders)
const Dashboard = () => <ComingSoon title="Dashboard" />;
const ClassSchedule = () => <ComingSoon title="Class Schedule" />;
const Grades = () => <ComingSoon title="Grades" />;
const Fees = () => <ComingSoon title="Fees" />;
const Prospectus = () => <ComingSoon title="Prospectus" />;
const Announcements = () => <ComingSoon title="Announcements" />;
const UPMail = () => <ComingSoon title="UP Mail" />;
const StudentInformation = () => <ComingSoon title="Student Information" />;
const Evaluations = () => <ComingSoon title="Evaluations" />;
const CampusFacility = () => <ComingSoon title="Campus Facility & Safety" />;
const CollegeFacility = () => <ComingSoon title="College Facility & Safety" />;
const StudentHousing = () => <ComingSoon title="Student Housing" />;
const PrivacyNotice = () => <ComingSoon title="UP Privacy Notice" />;

function App() {
  const [user, setUser] = useState(null);

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes - all require authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div>Authenticated layout would go here</div>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="class-schedule" element={<ClassSchedule />} />
          <Route path="grades" element={<Grades />} />
          <Route path="fees" element={<Fees />} />
          <Route path="prospectus" element={<Prospectus />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="up-mail" element={<UPMail />} />
          <Route path="student-information" element={<StudentInformation />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="campus-facility" element={<CampusFacility />} />
          <Route path="college-facility" element={<CollegeFacility />} />
          <Route path="student-housing" element={<StudentHousing />} />
          <Route path="privacy-notice" element={<PrivacyNotice />} />
        </Route>

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;