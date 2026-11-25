import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from '../context/TranslationContext.jsx';

// Demo account credentials from original Login.html
const DEMO_ACCOUNT = {
  studentNumber: '2026-17196',
  password: 'UPMin@2026'
};

// UP Mail domain validation
const UP_MAIL_DOMAINS = ['@up.edu.ph', '@upmindanao.edu.ph'];

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Load Google Identity Services script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      setGoogleLoaded(false);
    };
  }, []);

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

  // Google Sign-In response handler (defined before useEffect to avoid initialization issues)
  const handleGoogleResponse = useCallback(async (response) => {
    if (!response.credential) {
      setError('Google sign-in was cancelled.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const email = payload.email;
      const name = payload.name;
      const picture = payload.picture;

      // Validate UP Mail domain
      const isUpMail = UP_MAIL_DOMAINS.some(domain => email.endsWith(domain));
      if (!isUpMail) {
        setError('Only UP Mail accounts (@up.edu.ph, @upmindanao.edu.ph) are allowed.');
        setIsLoading(false);
        return;
      }

      // Extract student number from email (e.g., 2026-17196@up.edu.ph)
      const studentNumber = email.split('@')[0];

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      onLogin?.({
        studentNumber,
        name,
        email,
        photoURL: picture,
        program: 'BS Computer Science',
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError('Failed to sign in with Google. Please try again.');
      setIsLoading(false);
    }
  }, [navigate, onLogin]);

  // Initialize Google Sign-In button after script loads
  useEffect(() => {
    if (!googleLoaded || !window.google) return;

    const buttonDiv = document.getElementById('google-signin-btn');
    if (!buttonDiv) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.renderButton(buttonDiv, {
      theme: 'outline',
      size: 'large',
      width: '100%',
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'center',
    });
  }, [googleLoaded, handleGoogleResponse]);

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
                  <h1 className="h3 fw-bold text-maroon mb-1">{translate('KAPLAG')}</h1>
                  <p className="text-muted-custom mb-2">{translate('University of the Philippines Mindanao')}</p>
                  <hr className="login-divider my-3" aria-hidden="true" />
                  <h2 id="signin-title" className="h5 fw-semibold">{translate('Student Portal')}</h2>
                  <p className="text-muted-custom small">{translate('Sign in to access the student directory')}</p>
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
                    <Form.Label className="form-label fw-medium">{translate('Student number')}</Form.Label>
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
                      {translate('Your UP student number (format: YYYY-NNNNN)')}
                    </div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="form-label fw-medium">{translate('Password')}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={translate('Enter password')}
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
                      label={translate('Remember me')}
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={isLoading}
                      className="text-muted-custom small"
                    />
                    <button type="button" className="btn btn-link p-0 text-maroon small fw-medium" disabled={isLoading}>
                      {translate('Forgot password?')}
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
                        {translate('Signing in...')}
                      </span>
                    ) : (
                      translate('Sign in')
                    )}
                  </Button>
                </Form>

                {/* Google Sign-In Button */}
                <div className="mt-3">
                  {googleLoaded && window.google ? (
                    <div id="google-signin-btn" />
                  ) : (
                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="lg"
                      className="w-100 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                      disabled={isLoading || !googleLoaded}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {googleLoaded ? translate('Continue with Google') : translate('Loading Google Sign-In...')}
                    </Button>
                  )}
                </div>

                {/* Demo Account Box */}
                <div className="demo-box mt-4" role="region" aria-labelledby="demo-title">
                  <h3 id="demo-title">{translate('Demo account')}</h3>
                  <p><strong>{translate('Student no:')}</strong> {DEMO_ACCOUNT.studentNumber}</p>
                  <p><strong>{translate('Password:')}</strong> {DEMO_ACCOUNT.password}</p>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleAutoFill}
                    disabled={isLoading}
                    className="w-100 w-md-auto"
                  >
                    {translate('Autofill')}
                  </Button>
                </div>

              </Card.Body>
            </Card>

            {/* Footer */}
            <footer className="text-center mt-4 footer-text" role="contentinfo">
              <p>
                <a href="/privacy" className="text-maroon">{translate('Privacy Notice')}</a>{' '}
                · Data Privacy Act (RA 10173)
              </p>
              <p>{translate('© 2026 University of the Philippines Mindanao')} · Mintal, Davao City</p>
              <p className="fst-italic small">"Transforming lifelong learners into responsive leaders"</p>
            </footer>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;