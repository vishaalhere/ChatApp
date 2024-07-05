/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

// Global variable for input field class names
const inputClassNames = "w-full px-4 py-3 mb-2 border border-gray-300 rounded";

const LoginRegister = ({
  isRegistering,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleLogin,
  handleRegister,
  setIsRegistering,
  error,
}) => {
  // State to manage dynamic gradient animation
  const [gradientOffset, setGradientOffset] = useState(0);

  // Function to update gradient offset for animation
  const updateGradient = () => {
    setGradientOffset((prevOffset) => (prevOffset + 1) % 360);
  };

  // Effect to update gradient animation every 10ms
  useEffect(() => {
    const interval = setInterval(updateGradient, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(${gradientOffset}deg, #6EE7B7, #3490DE)`,
          animation: 'gradientAnimation 5s linear infinite',
        }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          {isRegistering && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClassNames}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassNames}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClassNames}
          />

          {isRegistering && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClassNames}
            />
          )}
          <button
            onClick={isRegistering ? handleRegister : handleLogin}
            className="btn-primary mt-6 w-full py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn-secondary mt-3 w-full py-3 rounded-lg text-blue-500 font-semibold border border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isRegistering
              ? 'Already have an account? Login'
              : 'Need an account? Register'}
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
