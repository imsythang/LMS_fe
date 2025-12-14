import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import { LibrarianLayout } from './components/librarian_pages/LibrarianLayout';
import { ErrorLayout } from './components/public_pages/ErrorLayout';
import { Layout } from './components/public_pages/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedLayout } from './components/user_pages/Sidebar';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Public pages
import AboutPage from './pages/public_pages/AboutPage';
import BookDetailPage from './pages/public_pages/BookDetailPage';
import CategoriesPage from './pages/public_pages/CategoriesPage';
import ContactPage from './pages/public_pages/ContactPage';
import CookiePolicyPage from './pages/public_pages/CookiePolicyPage';
import FAQPage from './pages/public_pages/FAQPage';
import HomePage from './pages/public_pages/HomePage';
import LoginPage from './pages/public_pages/LoginPage';
import PrivacyPolicyPage from './pages/public_pages/PrivacyPolicyPage';
import RegisterPage from './pages/public_pages/RegisterPage';
import SearchPage from './pages/public_pages/SearchPage';
import ServiceTermsPage from './pages/public_pages/ServiceTermsPage';
import TermsPage from './pages/public_pages/TermsPage';
import UserGuidePage from './pages/public_pages/UserGuidePage';

// User pages
import DashboardPage from './pages/user_pages/DashboardPage';
import FinesPage from './pages/user_pages/FinesPage';
import MyBooksPage from './pages/user_pages/MyBooksPage';
import NotificationsPage from './pages/user_pages/NotificationsPage';
import ProfilePage from './pages/user_pages/ProfilePage';
import ReservationsPage from './pages/user_pages/ReservationsPage';
import SettingsPage from './pages/user_pages/SettingsPage';
import WishlistPage from './pages/user_pages/WishlistPage';

// Librarian pages
import BookDetails from './pages/librarian_pages/BookDetails';
import BookList from './pages/librarian_pages/BookList';
import Circulation from './pages/librarian_pages/Circulation';
import CopyDetails from './pages/librarian_pages/CopyDetails';
import CopyList from './pages/librarian_pages/CopyList';
import LibrarianDashboard from './pages/librarian_pages/Dashboard';
import Notifications from './pages/librarian_pages/Notifications';
import Requests from './pages/librarian_pages/Requests';
import Settings from './pages/librarian_pages/Settings';

// Error pages
import ForbiddenPage from './pages/error_pages/ForbiddenPage';
import MaintenancePage from './pages/error_pages/MaintenancePage';
import NotFoundPage from './pages/error_pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedUserType: 'student' | 'librarian' | 'both';
}> = ({ children, allowedUserType }) => {
  const { userType } = useAuth();

  if (!userType) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType !== 'both' && userType !== allowedUserType) {
    // Redirect to appropriate dashboard
    if (userType === 'student') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/librarian/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// Wrapper to conditionally render Layout
const AppContent = () => {
  const location = useLocation();
  const { userType } = useAuth();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  // List of paths that use the user protected layout
  const userProtectedPaths = [
    '/dashboard',
    '/my-books',
    '/reservations',
    '/fines',
    '/profile',
    '/settings',
    '/wishlist',
    '/notifications',
  ];
  const isUserProtectedPage = userProtectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that use the librarian layout
  const librarianPaths = [
    '/librarian/dashboard',
    '/librarian/circulation',
    '/librarian/books',
    '/librarian/copies',
    '/librarian/requests',
    '/librarian/settings',
    '/librarian/notifications',
  ];
  const isLibrarianPage = librarianPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of error pages that use the error layout
  const errorPaths = ['/403', '/404', '/500'];
  const isErrorPage = errorPaths.includes(location.pathname);

  // Error pages (403, 404, 500) - separate layout with Header only
  if (isErrorPage) {
    return (
      <ErrorLayout>
        <Routes>
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/500" element={<MaintenancePage />} />
        </Routes>
      </ErrorLayout>
    );
  }

  // Redirect if logged in user tries to access auth pages
  if (isAuthPage && userType) {
    if (userType === 'librarian') {
      return <Navigate to="/librarian/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Auth pages (login, register)
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }

  // User protected pages
  if (isUserProtectedPage) {
    return (
      <ProtectedRoute allowedUserType="student">
        <ProtectedLayout>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-books" element={<MyBooksPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/fines" element={<FinesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </ProtectedLayout>
      </ProtectedRoute>
    );
  }

  // Librarian pages
  if (isLibrarianPage) {
    return (
      <ProtectedRoute allowedUserType="librarian">
        <LibrarianLayout>
          <Routes>
            <Route
              path="/librarian/dashboard"
              element={<LibrarianDashboard />}
            />
            <Route path="/librarian/circulation" element={<Circulation />} />
            <Route path="/librarian/books" element={<BookList />} />
            <Route path="/librarian/books/:id" element={<BookDetails />} />
            <Route path="/librarian/copies" element={<CopyList />} />
            <Route path="/librarian/copies/:id" element={<CopyDetails />} />
            <Route path="/librarian/requests" element={<Requests />} />
            <Route path="/librarian/settings" element={<Settings />} />
            <Route
              path="/librarian/notifications"
              element={<Notifications />}
            />
          </Routes>
        </LibrarianLayout>
      </ProtectedRoute>
    );
  }

  // Public pages
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<UserGuidePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/service-terms" element={<ServiceTermsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
