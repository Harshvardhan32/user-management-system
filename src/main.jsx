/**
 * Main entry point for the User Management System application
 * Sets up React with React Router and Context Providers
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <Toaster />
            <App />
        </ThemeProvider>
    </StrictMode>,
);