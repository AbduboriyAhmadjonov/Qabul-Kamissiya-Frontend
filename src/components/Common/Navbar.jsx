// src/components/Common/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lowercaseDashboard from '../../utils/lowercase';

const Navbar = ({ isAuthenticated, userRole, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  console.log(userRole);

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from App
    navigate('/'); // Redirect to home after logout
  };

  // Determine which links to show based on authentication and role
  const publicNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/universities', label: 'Universities' },
    { to: '/tests', label: 'Test Information' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register', buttonStyle: true },
  ];

  const dashboardLink = isAuthenticated
    ? {
        to:
          userRole === 'ADMIN'
            ? '/admin/dashboard'
            : userRole === 'ENLISTMENT_OFFICER'
            ? '/officer/dashboard'
            : '/candidate/dashboard',
        label: `${lowercaseDashboard(userRole)} Dashboard`,
      }
    : null;

  return (
    <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="text-2xl font-semibold hover:text-gray-300">
            O'zbekiston Oliy Qurolli Kuchlari
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white px-3 py-2 border rounded hover:text-gray-300 hover:border-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {publicNavLinks
            .filter(
              (link) =>
                !(
                  isAuthenticated &&
                  (link.label === 'Login' || link.label === 'Register')
                )
            )
            .map((link, index) =>
              link.label === 'Login' || link.label === 'Register' ? (
                <Link
                  key={index}
                  to={link.to}
                  className={`text-white hover:text-gray-300 transition px-4 py-2 rounded-md
                    ${link.buttonStyle ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  `}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className="text-white hover:text-gray-300 transition"
                >
                  {link.label}
                </Link>
              )
            )}
          {dashboardLink && (
            <Link
              to={dashboardLink.to}
              className="text-white hover:text-gray-300 transition"
            >
              {dashboardLink.label}
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="w-full block lg:hidden mt-4 bg-gray-800 rounded shadow-lg absolute left-0 top-full z-50">
            {publicNavLinks
              .filter(
                (link) =>
                  !(
                    isAuthenticated &&
                    (link.label === 'Login' || link.label === 'Register')
                  )
              )
              .map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`block text-white hover:text-gray-300 transition px-3 py-2 rounded-md
                    ${
                      link.buttonStyle
                        ? 'bg-blue-600 hover:bg-blue-700 text-center mt-4'
                        : 'text-center'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {link.label}
                </Link>
              ))}
            {dashboardLink && (
              <Link
                to={dashboardLink.to}
                className="block text-white hover:text-gray-300 transition px-3 py-2 rounded-md text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dashboardLink.label}
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-center mt-4"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
