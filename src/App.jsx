/**
 * Root Application Component
 * Handles main routing and layout structure
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import { useContext } from 'react';

/**
   * Protected Route wrapper component
   * Redirects to login if user is not authenticated
   */
const PrivateRoute = ({ children }) => {

    const token = localStorage.getItem('token');
    return token ? (
        <>
            <Navbar />
            {children}
        </>
    ) : (
        <Navigate to="/login" />
    );
};

/**
 * Main App component
 * Handles dark mode and routing
 */
function App() {

    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/users"
                            element={
                                <PrivateRoute>
                                    <UserList />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
        </div>
    );
}

export default App;