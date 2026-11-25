import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

// Demo account credentials from original Login.html
const DEMO_ACCOUNT = {
  studentNumber: '2026-17196',
  password: 'UPMin@2026'
};

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Demo authentication
    if (studentNumber === DEMO_ACCOUNT.studentNumber && password === DEMO_ACCOUNT.password) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
      onLogin?.({ studentNumber, name: 'Vanz Kean', program: 'BS Computer Science' });
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid student number or password. Try the demo account.');
    }
  };

  const handleAutoFill = () => {
    setStudentNumber(DEMO_ACCOUNT.studentNumber);
    setPassword(DEMO_ACCOUNT.password);
    setRemember(true);
  };

  return (
    <div className="login-page min-vh-100 d-flex align-items-center justify-content-center p-4">
      <Container className="w-100">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            {/* Login Card */}
            <Card className="login-card">
              <Card.Body className="p-4 p-md-5">

                {/* Header: Logo, System Name, Page Title */}
                <div className="text-center mb-4" role="banner">
                  <img
                    src="/img/Logo.png"
                    alt="UP Mindanao logo"
                    className="login-logo mb-3"
                  />
                  <h1 className="h3 fw-bold text-maroon mb-1">KAPLAG</h1>
                  <p className="text-muted-custom mb-2">University of the Philippines Mindanao</p>
                  <hr className="login-divider my-3" aria-hidden="true" />
                  <h2 id="signin-title" className="h5 fw-semibold">Student Portal</h2>
                  <p className="text-muted-custom small">Sign in to access the student directory</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="mb-3 py-2" role="alert">
                    <small>{error}</small>
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit} noValidate aria-labelledby="signin-title">
                  {/* Student Number */}
                  <Form.Group className="mb-3" controlId="student-number">
                    <Form.Label className="form-label fw-medium">Student number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. 2026-17196"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      autoComplete="username"
                      required
                      disabled={isLoading}
                      aria-describedby="student-number-help"
                    />
                    <div id="student-number-help" className="form-text text-muted-custom small">
                      Your UP student number (format: YYYY-NNNNN)
                    </div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="form-label fw-medium">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                    />
                  </Form.Group>

                  {/* Options Row: Remember me + Forgot password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={isLoading}
                      className="text-muted-custom small"
                    />
                    <button type="button" className="btn btn-link p-0 text-maroon small fw-medium" disabled={isLoading}>
                      Forgot password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 py-2 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </Form>

                {/* Demo Account Box */}
                <div className="demo-box mt-4" role="region" aria-labelledby="demo-title">
                  <h3 id="demo-title">Demo account</h3>
                  <p><strong>Student no:</strong> {DEMO_ACCOUNT.studentNumber}</p>
                  <p><strong>Password:</strong> {DEMO_ACCOUNT.password}</p>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleAutoFill}
                    disabled={isLoading}
                    className="w-100 w-md-auto"
                  >
                    Autofill
                  </Button>
                </div>

              </Card.Body>
            </Card>

            {/* Footer */}
            <footer className="text-center mt-4 footer-text" role="contentinfo">
              <p>
                <a href="/privacy" className="text-maroon">Privacy Notice</a>{' '}
                · Data Privacy Act (RA 10173)
              </p>
              <p>© 2026 UP Mindanao · Mintal, Davao City</p>
              <p className="fst-italic small">"Transforming lifelong learners into responsive leaders"</p>
            </footer>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;